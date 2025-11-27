// api/tarot.js
// Versión PROTEGIDA: solo acepta peticiones desde tus dominios
// y aplica un rate limit muy simple por IP.

const allowedOrigins = [
  "https://wilmerflorez.com",
  "https://www.wilmerflorez.com",
  "https://wilmer-florez.vercel.app", // para pruebas directas en Vercel
];

// Rate limit muy sencillo en memoria:
// máximo 20 peticiones por IP cada 10 minutos
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 20;
const ipHits = new Map();

export default async function handler(req, res) {
  // ----- CORS + ORIGEN -----
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";

  const isAllowedOrigin =
    allowedOrigins.includes(origin) ||
    allowedOrigins.some((o) => referer.startsWith(o));

  // Cabeceras CORS
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin && referer.startsWith("https://wilmer-florez.vercel.app")) {
    // caso: pruebas directas en vercel.app sin Origin
    res.setHeader("Access-Control-Allow-Origin", "https://wilmer-florez.vercel.app");
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight CORS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Bloquear orígenes no permitidos
  if (!isAllowedOrigin) {
    return res
      .status(403)
      .json({ error: "Forbidden: origen no autorizado para usar este oráculo." });
  }

  // ----- RATE LIMIT POR IP -----
  try {
    const ip =
      (req.headers["x-forwarded-for"] || "")
        .toString()
        .split(",")[0]
        .trim() || req.socket.remoteAddress || "unknown";

    const now = Date.now();
    const hits = ipHits.get(ip) || [];
    const recentHits = hits.filter((ts) => now - ts < rateLimitWindowMs);
    recentHits.push(now);
    ipHits.set(ip, recentHits);

    if (recentHits.length > rateLimitMaxRequests) {
      return res
        .status(429)
        .json({ error: "Demasiadas consultas desde esta IP. Intenta más tarde." });
    }
  } catch (e) {
    console.error("Error en rate limit:", e);
    // si falla el rate limit, no bloqueamos, pero queda logeado
  }

  // ----- LÓGICA DEL ORÁCULO (OpenAI) -----
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Método no permitido" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Falta OPENAI_API_KEY en las variables de entorno de Vercel.",
      });
    }

    const { question, cards, drawType } = req.body || {};

    const cardsDescription = (cards || [])
      .map((c) => `${c.name}${c.position ? " (" + c.position + ")" : ""}`)
      .join(", ");

    const prompt = `
Eres un oráculo de tarot sabio y empático.
Responde basándote en las cartas y en la pregunta de la persona.
No hagas predicciones absolutas ni promesas sobre salud, dinero o muerte.
Ofrece orientación simbólica y reflexiva.

Tipo de tirada: ${drawType || "desconocida"}
Cartas extraídas: ${cardsDescription || "ninguna"}
Pregunta de la persona: "${question || ""}"

Detecta automáticamente el idioma de la pregunta y responde en ese mismo idioma.
Escribe 2–4 párrafos y termina con un consejo práctico concreto.
    `.trim();

    const openaiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
      }),
    });

    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      console.error("Error de OpenAI:", errorText);
      return res.status(500).json({
        error: "Error al consultar OpenAI",
        details: errorText,
      });
    }

    const json = await openaiRes.json();

    const answer =
      json?.output?.[0]?.content?.[0]?.text ||
      "El oráculo no ha devuelto un mensaje claro.";

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Error interno en api/tarot:", err);
    return res.status(500).json({
      error: "Error interno en el oráculo",
      details: err.message,
    });
  }
}