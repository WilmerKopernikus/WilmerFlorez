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
      //
      // Sketches with cdnScripts load their dependencies sequentially first,
      // then append the sketch script so all globals (p5, ml5, etc.) are ready.
      if (sketch.cdnScripts && sketch.cdnScripts.length > 0) {
        // Show a plain-JS overlay immediately — appears as soon as the loading
        // screen hides, long before any CDN script finishes downloading.
        document.addEventListener('DOMContentLoaded', function () {
          var ol = document.createElement('div');
          ol.id = 'sketch-loading-overlay';
          ol.style.cssText = [
            'position:fixed',
            'top:50%',
            'left:50%',
            'transform:translate(-50%,-50%)',
            'z-index:100',
            'color:#fff',
            'font-family:Arial,Helvetica,sans-serif',
            'font-size:1rem',
            'letter-spacing:0.08em',
            'text-align:center',
            'pointer-events:none',
            'text-shadow:0 0 8px rgba(0,0,0,0.8)'
          ].join(';');
          ol.innerHTML =
            '<span data-i18n="faceMeshLoading">Loading face model &amp; camera&hellip;</span><br>' +
            '<span data-i18n="faceMeshLoadingCamera" style="font-size:0.8rem;opacity:0.7;">' +
            'Please allow camera access when prompted.' +
            '</span>';
          document.body.appendChild(ol);
        });

        (function loadSequentially(urls, index) {
          if (index >= urls.length) {
            var sketchScript = document.createElement('script');
            sketchScript.src = sketch.script;
            document.head.appendChild(sketchScript);
            return;
          }
          var s = document.createElement('script');
          s.src = urls[index];
          s.onload = function () { loadSequentially(urls, index + 1); };
          s.onerror = function () { loadSequentially(urls, index + 1); };
          document.head.appendChild(s);
        })(sketch.cdnScripts, 0);
      } else {
        var sketchScript = document.createElement('script');
        sketchScript.src = sketch.script;
        document.head.appendChild(sketchScript);
      }

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

        var instructionsParagraph = '';
        var detailsHtml = '';
        if (sketch.instructions) {
          var instructionsI18nAttr = sketch.instructionsKey ? ' data-i18n="' + sketch.instructionsKey + '"' : ' data-i18n=""';
          instructionsParagraph = '<p class="text-new" id="kunden-light"' + instructionsI18nAttr + '>'
            + '<strong>Instructions:</strong> ' + sketch.instructions
            + '</p><br>';
          if (!sketch.instructionsInLeft) {
            detailsHtml += instructionsParagraph;
          }
        }

        if (sketch.description) {
          var descriptionI18nAttr = sketch.descriptionKey ? ' data-i18n="' + sketch.descriptionKey + '"' : ' data-i18n=""';
          detailsHtml += '<p class="text-new" id="kunden-light"' + descriptionI18nAttr + '>'
            + sketch.description + '</p>';
        }

        var buttonsHtml = sketch.buttons || '';

        if (leftDiv) {
          if (sketch.instructionsInLeft && instructionsParagraph) {
            leftDiv.innerHTML = titleHtml + instructionsParagraph;
          } else {
            leftDiv.innerHTML = titleHtml;
          }
        }

        // Inject buttons into card1's dedicated container (bottom-left of the hero card)
        var buttonsContainer = document.getElementById('sketch-buttons-container');
        if (buttonsContainer && buttonsHtml) {
          buttonsContainer.innerHTML = buttonsHtml;
        }

        if (rightDiv) {
          rightDiv.innerHTML = detailsHtml;
        }

        if (mobileContentDiv) {
          var mobileInstructions = sketch.instructionsInLeft ? instructionsParagraph : '';
          mobileContentDiv.innerHTML = titleHtml + mobileInstructions + detailsHtml;
        }

        // --- Update page title ---
        document.title = sketch.title + ' | Wilmer Florez - Webentwickler & Designer';
      });
    }());