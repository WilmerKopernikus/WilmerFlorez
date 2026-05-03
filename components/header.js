class SiteShell extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="header">
        <div class="nav-container">
          <a href="index.html">
            <img src="imagenes/logo.png" alt="Wilmer Florez Logo" class="header-logo">
          </a>
        </div>
      </div>
      <div class="hamburger-menu">
        <div class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="language-selector">
        <input type="checkbox" id="langToggle" hidden />
        <label for="langToggle" class="current-lang">DE ▼</label>
        <ul class="language-options">
          <li><button class="lang-button" data-lang="de">DE</button></li>
          <li><button class="lang-button" data-lang="en">EN</button></li>
          <li><button class="lang-button" data-lang="es">ES</button></li>
        </ul>
      </div>

      <div class="menu-overlay" id="menuOverlay">
        <ul>
          <li>
            <a href="index.html">
              <img class="menu-icon" src="imagenes/svg/home2.svg" alt="Startseite Icon">
              <span data-i18n="menuIndex" id="let-there-be-light">Startseite</span>
            </a>
          </li>

          <li>
            <a href="kundenprojekte.html">
              <img class="menu-icon" src="imagenes/svg/kundenprojekte.svg" alt="Projekte Icon">
              <span data-i18n="menuProjekte" id="let-there-be-light">Kundenprojekte</span>
            </a>
          </li>

          <li>
            <a href="meine_projekte.html">
              <img class="menu-icon" src="imagenes/svg/eigene.svg" alt="Projekte Icon">
              <span data-i18n="menuEigeneProjekte" id="let-there-be-light">Meine Projekte</span>
            </a>
          </li>

          <li>
            <a href="creative_coding.html">
              <img class="menu-icon" src="imagenes/svg/creative.svg" alt="Projekte Icon">
              <span data-i18n="menuCreativeCoding" id="let-there-be-light">Creative Coding</span>
            </a>
          </li>

          <li>
            <a href="about.html">
              <img class="menu-icon" src="imagenes/svg/mich.svg" alt="Projekte Icon">
              <span data-i18n="menuUeberMich" id="let-there-be-light">Über Mich</span>
            </a>
          </li>

          <li>
            <a href="kontakt.html">
              <img class="menu-icon" src="imagenes/svg/contact.svg" alt="Kontakt Icon">
              <span data-i18n="menuKontakt" id="let-there-be-light">Kontakt</span>
            </a>
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define('site-shell', SiteShell);