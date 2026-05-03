class ImpressumShellDesktop extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `  
          <div class="card-body" id="cases">
            <div class="left" id="center-services">
              <h2 class="title" id="let-there-be-light" data-i18n="footerTitle">KREATIV UND INNOVATIV</h2>
              <div class="service-item active">
                <div class="service-trigger text-new justify">
                  Wilmer Aderbert Florez López
                </div>
                <div class="service-description text justify">
                  <p class="service-description text justify" data-i18n="footerDescription">
                    Web Developer - UI/UX Designer - Creative Coder<br>
                    Creating performant, user-focused web experiences<br>
                    Based in Germany · Working internationally<br>
                    wilmerkopernikus@gmail.com <br>
                    (+49)1771 827690 - (+86)185 2006 0442

                </div>
              </div>
              <div class="service-item">
                <div class="service-trigger text-new justify" data-i18n="footerNavigation">
                  Navigation
                </div>
                <div class="service-description text justify">
                  <a href="index.html" class="text-link" data-i18n="menuIndex">Startseite</a><br>
                  <a href="kundenprojekte.html" class="text-link" data-i18n="menuProjekte">Kundenprojekte</a><br>
                  <a href="meine_projekte.html" class="text-link" data-i18n="menuEigeneProjekte">Meine Projekte</a><br>
                  <a href="creative_coding.html" class="text-link" data-i18n="menuCreativeCoding">Creative
                    Coding</a><br>
                  <a href="about.html" class="text-link" data-i18n="menuUeberMich">Über Mich</a><br>
                  <a href="kontakt.html" class="text-link" data-i18n="menuKontakt">Kontakt</a><br>
                </div>
              </div>
              <div class="service-item">
                <div class="service-trigger text-new justify">
                  Github
                </div>
                <div class="service-description text justify">
                  <a href="https://github.com/wilmerkopernikus" class="text-link"
                    target="_blank">https://github.com/wilmerkopernikus</a><br>
                </div>
              </div>
              <div class="service-item">
                <div class="service-trigger text-new justify" data-i18n="impressumTitle">
                  Impressum
                </div>
                <div class="service-description text justify" data-i18n="impressumContent">
                  Wilmer Aderbert Florez López<br>
                  Am Stumpenhof 14 - 73207 Plochingen, Deutschland <br>
                  wilmerkopernikus@gmail.com - (+49)1771 827690 - (+86)185 2006 0442<br>
                  Responsible for content according to §55 Abs. 2 RStV
                </div>
              </div>

              <p class="text-new" id="low-light" data-i18n="derechos">© 2026 Wilmer Florez. Alle Rechte vorbehalten.</p>
            </div>
            <div class="right" id="responsive-sketch">
              <video id="services-animation" autoplay loop muted playsinline preload="metadata" loading="lazy"
                poster="imagenes/videos/services_04.jpg" class="white-shadow">
                <source src="imagenes/videos/services_04_compressed.mp4" type="video/mp4" />
                Your browser doesn't support video reproductions.
              </video>
            </div>
          </div>
    `;
  }
}

customElements.define('impressum-shell-desktop', ImpressumShellDesktop);