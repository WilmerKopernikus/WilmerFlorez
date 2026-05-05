class ContactShellMobile extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `  
          <div class="card-body" id="contact-proportion-text">
            <div class="right"></div>

            <div class="left" id="center-services">
              <div class="card-content-flex">
                <h2 class="title let-there-be-light" data-i18n="chooseUsTitle">ARBEITEN WIR ZUSAMMEN?</h2>
                <p class="text-new low-light" data-i18n="">
                  Sind Sie auf der Suche nach einem engagierten Webentwickler für
                  Ihr Team oder Ihr nächstes Projekt? Kontaktieren Sie mich gerne, um Ihre Anforderungen zu besprechen.
                </p><br>
                <form class="contact-form" name="contact" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact">
                  <p style="display:none;">
                    <label>Don't fill this out if you're human: <input name="bot-field"></label>
                  </p>
                  <div class="form-group">
                    <label for="name" id="low-light" data-i18n="formNameLabel">Ihr Name:</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div class="form-group">
                    <label for="email" id="low-light" data-i18n="formEmailLabel">Ihre E-Mail:</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div class="form-group">
                    <label for="message" id="low-light" data-i18n="formMessageLabel">Ihre Nachricht:</label>
                    <textarea id="message" name="message" required></textarea>
                  </div>
                  <button type="submit" class="send-button" id="low-light" data-i18n="formSubmit">Senden</button>
                </form>
              </div>
            </div>
          </div>
    `;
  }
}

customElements.define('contact-shell-mobile', ContactShellMobile);