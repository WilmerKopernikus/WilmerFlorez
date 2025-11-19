// scripts/contact-i18n.js

const indexContent = {
  de: {

    menuIndex: `Startseite`,
    menuProjekte: `Projekte`,
    menuCV: `Lebenslauf`,
    menuKontakt: `Kontakt`,

    indexTitle: `WILLKOMMEN IN EINEM <br> NEUEN DIGITALEN KOSMOS!`,
    wilmerIntroduction: `Ich bin Webentwickler, Grafikdesigner und bildender Künstler mit internationaler 
    Erfahrung in Deutschland, China und Kolumbien. In diesem Portfolio präsentiere ich sowohl berufliche 
    als auch persönliche Projekte, die meinen Ansatz widerspiegeln: Design, Technologie und Kreativität 
    zu verbinden, um digitale Lösungen auf höchstem Niveau zu entwickeln.`,

    projectTitle: `PROJEKTE`,
    projectContent: `Erfahren Sie in verschiedenen Projektbeispielen, wie ich Kunden mit wirkungsvollem 
    Webdesign und -entwicklung unterstützt habe.`,
    projectButton: `Zu meinen Projekten`,

    curriculumTitle: `LEBENSLAUF`,
    curriculmContent: `Entdecken Sie meinen Lebenslauf in digitaler Form und erfahren Sie mehr über meine 
    berufliche Erfahrung, meine technischen Fähigkeiten und meinen internationalen Werdegang.`,
    curriculumButton: `Zu meinem Lebenslauf`,

    contactTitle: `KONTAKT`,
    contactContent: `Möchten Sie mit mir zusammenarbeiten? Haben Sie bereits konkrete Vorstellungen oder 
    möchten Sie gemeinsam erste Ideen entwickeln? Kontaktieren Sie mich gerne – und lassen Sie uns Ihre 
    digitale Zukunft in Bewegung setzen.`,
    contactButton: `Zum Kontakt`,
  },

  en: {

    menuIndex: `Home`,
    menuProjekte: `Projects`,
    menuCV: `Services`,
    menuKontakt: `Contact`,

    indexTitle: `WELCOME TO A NEW <br> DIGITAL COSMOS!`,
    wilmerIntroduction: `I am a web developer, graphic designer, and visual artist with international 
    experience in Germany, China, and Colombia. In this portfolio, I present both professional and 
    personal projects that reflect my approach: combining design, technology, and creativity to develop 
    high-quality digital solutions.`,

    projectTitle: `PROJECTS`,
    projectContent: `Discover a selection of project examples that show how I have supported clients 
    through impactful web design and development.`,
    projectButton: `View my projects`,

    curriculumTitle: `RESUME`,
    curriculmContent: `Explore my resume in digital form and learn more about my professional experience, 
    technical skills, and international background.`,
    curriculumButton: `View my resume`,

    contactTitle: `CONTACT`,
    contactContent: `Would you like to work with me? Whether you already have a clear vision or want to 
    develop initial ideas together, feel free to get in touch — and let’s set your digital future in motion.`,
    contactButton: `Go to contact`,
  },

  es: {
    indexTitle: 'CONTACTO',
    
  }
};

let currentLang = 'de';

function applyLanguage(lang) {
  const dict = indexContent[lang];
  if (!dict) return;

  // 1) Actualizar textos de la página
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const value = dict[key];
    if (!value) return;

    el.innerHTML = value;
  });

  // 2) Guardar idioma actual
  currentLang = lang;

  // 3) Actualizar el texto del label "DE ▼"
  const currentLangLabel = document.querySelector('.language-selector .current-lang');
  if (currentLangLabel) {
    currentLangLabel.textContent = lang.toUpperCase() + ' ▼';
  }

  // 4) Ocultar el idioma actual de la lista de opciones
  document.querySelectorAll('.language-selector .lang-button[data-lang]').forEach((btn) => {
    const btnLang = btn.dataset.lang;
    if (btnLang === lang) {
      // este es el idioma actual → esconderlo
      btn.style.display = 'none';
    } else {
      // otros idiomas → mostrarlos
      btn.style.display = 'block';
    }
  });
}


// 3) Eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // Idioma por defecto
  applyLanguage(currentLang);

  // Listeners para los botones de idioma
  document.querySelectorAll('.lang-button[data-lang]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.dataset.lang;
      applyLanguage(lang);
    });
  });
});

