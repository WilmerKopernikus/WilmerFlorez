// scripts/contact-i18n.js

// 1) Diccionario de textos
const contactContent = {
  de: {
    heroTitle: 'KONTAKT',
    chooseUsTitle: 'WÄHLEN SIE UNS!',
    chooseUsText: `
      Bereit Ihr Unternehmen auf das nächste Level zu bringen? 
      Eine Website zu haben bedeutet nicht nur, online zu sein – es bedeutet, neue Chancen 
      zu eröffnen. Eine gut gestaltete Website hilft Ihnen, Kunden zu gewinnen, Vertrauen 
      aufzubauen und Ihre Dienstleistungen rund um die Uhr zu präsentieren.
      <br><br>
      Wir unterstützen Sie dabei, eine Website zu erstellen, die nicht nur visuell ansprechend, 
      sondern auch benutzerfreundlich und suchmaschinenoptimiert ist. Gemeinsam mit Ihnen erarbeiten 
      wir eine Lösung, die Ihre Unternehmensziele bestmöglich unterstützt.
      <br><br>
    `,
    impressumTitle: 'IMPRESSUM',
    impressumText: `
      Gesetzliche Vertretung: Wilmer Aderbert Florez Lopez <br>  
      Calle 75 # 58-51 – 111211 Bogotá, Kolumbien<br>
      wilmerkopernikus@gmail.com<br>
      Registriert und rechtlich vertreten in Bogotá, Kolumbien.<br>
      Umsatzsteuer (MwSt) ist auf internationale Transaktionen nicht anwendbar.
    `,

    formTitle: 'KONTAKT',
    formNameLabel: 'Ihr Name:',
    formEmailLabel: 'Ihre E-Mail:',
    formMessageLabel: 'Ihre Nachricht:',
    formSubmit: 'Senden',
  },

  en: {
    heroTitle: 'CONTACT',

    chooseUsTitle: 'MAKE US YOUR CHOICE!',
    chooseUsText: `
      Ready to take your business to the next level?
      Having a website is not just about being online – it’s about opening new opportunities.
      A well-designed website helps you gain customers, build trust, and present your services 24/7.
      <br><br>
      We help you create a website that is not only visually appealing, but also user-friendly
      and search-engine optimized. Together with you, we develop a solution that supports your
      business goals in the best possible way.
      <br><br>
    `,
    impressumTitle: 'LEGAL NOTICE',
    impressumText: `
      Legal representative: Wilmer Aderbert Florez Lopez <br>
      Calle 75 # 58-51 – 111211 Bogotá, Colombia<br>
      wilmerkopernikus@gmail.com<br>
      Registered and legally represented in Bogotá, Colombia.<br>
      VAT is not applicable to international transactions.
    `,

    formTitle: 'CONTACT',
    formNameLabel: 'Your name:',
    formEmailLabel: 'Your email:',
    formMessageLabel: 'Your message:',
    formSubmit: 'Send',

  },

  es: {
    heroTitle: 'CONTACTO',
  }
};

let currentLang = 'de';

function applyLanguage(lang) {
  const dict = contactContent[lang];
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

