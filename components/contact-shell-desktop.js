class ContactShellDesktop extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `  
          <div class="card-body" id="cases">
            <div class="left" id="center-services">
              <h2 class="title let-there-be-light" id="title-medium" data-i18n="chooseUsTitle">ARBEITEN WIR ZUSAMMEN?
              </h2>
              <p class="text-new" id="low-light" data-i18n="chooseUsText">
                Sind Sie auf der Suche nach einem engagierten Webentwickler für
                Ihr Team oder Ihr nächstes Projekt?<br><br>

                Wenn Sie Unterstützung für Ihr Projekt benötigen oder
                jemanden suchen, der sich engagiert in neue Aufgaben einarbeitet, freue ich mich über eine
                Kontaktaufnahme.
                Gerne bespreche ich mit Ihnen, wie ich Ihr Team und Ihre Ziele bestmöglich unterstützen kann.
                <br><br>
              </p>
            </div>
            <div class="right" id="center-services">
              <h2 class="title let-there-be-light" id="title-medium" data-i18n="formTitle">KONTAKTIEREN SIE MICH!</h2>
              <form class="contact-form" name="contact" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contact">
                <p style="display:none;">
                  <label>Don't fill this out if you're human: <input name="bot-field"></label>
                </p>
                <div class="form-group">
                  <label for="name" data-i18n="formNameLabel" id="low-light">Ihr Name:</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div class="form-group">
                  <label for="email" data-i18n="formEmailLabel" id="low-light">Ihre E-Mail:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                  <label for="message" data-i18n="formMessageLabel" id="low-light">Ihre Nachricht:</label>
                  <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" class="send-button" data-i18n="formSubmit" id="low-light">Senden</button>
              </form>
            </div>
          </div>
    `;
  }
}

customElements.define('contact-shell-desktop', ContactShellDesktop);