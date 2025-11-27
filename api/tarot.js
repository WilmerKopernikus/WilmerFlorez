// api/tarot.js
// Versión con OpenAI usando /v1/responses

export default async function handler(req, res) {
  try {
    // Solo aceptamos POST
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Método no permitido" });
    }

    // 1. Comprobar API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Falta OPENAI_API_KEY en las variables de entorno de Vercel.",
      });
    }

    // 2. Leer datos del body
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

Responde en español, en 2–4 párrafos, claros y poéticos.
Termina con un consejo práctico concreto.
    `.trim();

    // 3. Llamar a OpenAI /v1/responses
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

    // 4. Si OpenAI devuelve error, enviamos detalles
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
