(function () {
      var params = new URLSearchParams(window.location.search);
      var sketchId = params.get('sketch');
      var sketch = CREATIVE_SKETCHES[sketchId];

      if (!sketch) {
        // Unknown or missing sketch id – redirect to the gallery
        window.location.replace('creative_coding.html');
        return;
      }

      // --- Inject sketch script IMMEDIATELY ---
      // Must happen here (not inside DOMContentLoaded) so the browser starts
      // fetching it as early as possible. p5.min.js (deferred) registers a
      // window.load listener; if the sketch script is only injected on
      // DOMContentLoaded it may not finish loading before window.load fires,
      // causing p5 to miss setup/draw/preload — especially on slow connections.
      var sketchScript = document.createElement('script');
      sketchScript.src = sketch.script;
      document.head.appendChild(sketchScript);

      // --- Inject <link rel="preload"> hints for any declared images ---
      if (sketch.preloadImages) {
        sketch.preloadImages.forEach(function(src) {
          var ext = src.split('.').pop().toLowerCase();
          var typeMap = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
          var link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          if (typeMap[ext]) link.type = typeMap[ext];
          document.head.appendChild(link);
        });
      }

      document.addEventListener('DOMContentLoaded', function () {

        // --- Populate card1-creative-case ---
        var card = document.getElementById('card1-creative-case');
        var leftDiv = card ? card.querySelector('.left') : null;
        var rightDiv = card ? card.querySelector('.right') : null;
        var mobileContentDiv = document.querySelector('.cards-mobile #card1-creative-case .card-content-flex');

        var titleText = sketch.title || '';
        var titleI18nAttr = sketch.titleKey ? ' data-i18n="' + sketch.titleKey + '"' : ' data-i18n=""';
        var titleHtml = '<h2 class="title" id="kunden-light"' + titleI18nAttr + '>'
          + titleText + '</h2>';

        var detailsHtml = '';
        if (sketch.instructions) {
          var instructionsI18nAttr = sketch.instructionsKey ? ' data-i18n="' + sketch.instructionsKey + '"' : ' data-i18n=""';
          detailsHtml += '<p class="text-new" id="kunden-light"' + instructionsI18nAttr + '>'
            + '<strong>Instructions:</strong> ' + sketch.instructions
            + '</p><br>';
        }

        if (sketch.description) {
          var descriptionI18nAttr = sketch.descriptionKey ? ' data-i18n="' + sketch.descriptionKey + '"' : ' data-i18n=""';
          detailsHtml += '<p class="text-new" id="kunden-light"' + descriptionI18nAttr + '>'
            + sketch.description + '</p>';
        }

        var buttonsHtml = sketch.buttons ? '<div class="sketch-buttons">' + sketch.buttons + '</div>' : '';

        if (leftDiv) {
          leftDiv.innerHTML = titleHtml + buttonsHtml;
        }

        if (rightDiv) {
          rightDiv.innerHTML = detailsHtml;
        }

        if (mobileContentDiv) {
          mobileContentDiv.innerHTML = titleHtml + detailsHtml;
        }

        // --- Update page title ---
        document.title = sketch.title + ' | Wilmer Florez - Webentwickler & Designer';
      });
    }());