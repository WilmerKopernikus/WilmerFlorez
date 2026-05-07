function initNoiseFieldLoader() {
  const loadingScreen = document.getElementById('loadingScreen');

  if (!loadingScreen) {
    return;
  }

  loadingScreen.classList.add('noise-field-loader');

  let loadingSketch = document.getElementById('loadingSketch');
  if (!loadingSketch) {
    loadingSketch = document.createElement('div');
    loadingSketch.id = 'loadingSketch';
    loadingSketch.className = 'loading-sketch-canvas';
    loadingSketch.setAttribute('aria-hidden', 'true');
    loadingScreen.prepend(loadingSketch);
  }

  let loadingWord = loadingScreen.querySelector('.loading-word');
  if (!loadingWord) {
    loadingWord = document.createElement('p');
    loadingWord.className = 'loading-word';
    loadingWord.textContent = 'Loading';
    loadingScreen.appendChild(loadingWord);
  }

  function startSketch() {
    if (typeof createNoiseFieldPaintingSketch === 'function' && !window.loadingNoiseFieldSketch) {
      window.loadingNoiseFieldSketch = createNoiseFieldPaintingSketch(loadingSketch, { mode: 'loader' });
    }
  }

  startSketch();

  if (!window.loadingNoiseFieldSketch) {
    document.addEventListener('DOMContentLoaded', startSketch, { once: true });
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');

  if (!loadingScreen) {
    return;
  }

  loadingScreen.classList.add('fade-out');

  window.setTimeout(() => {
    if (window.loadingNoiseFieldSketch && typeof window.loadingNoiseFieldSketch.remove === 'function') {
      window.loadingNoiseFieldSketch.remove();
      window.loadingNoiseFieldSketch = null;
    }

    loadingScreen.style.display = 'none';
  }, 550);
}

(function installNoiseFieldLoaderStyles() {
  if (document.getElementById('noise-field-loader-styles')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'noise-field-loader-styles';
  style.textContent = `
    #loadingScreen.noise-field-loader {
      overflow: hidden;
      transition: opacity 0.55s ease;
    }

    #loadingScreen.noise-field-loader.fade-out {
      opacity: 0;
      pointer-events: none;
    }

    #loadingScreen .loading-sketch-canvas {
      position: absolute;
      inset: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    #loadingScreen .loading-word {
      position: relative;
      z-index: 1;
      margin: 0;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      font-size: clamp(1.5rem, 5vw, 4rem);
      font-weight: 700;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      text-shadow: 0 0 12px rgba(255, 255, 255, 0.72), 0 0 36px rgba(178, 34, 34, 0.8);
      transform: translateX(0.14em);
    }
  `;
  document.head.appendChild(style);
}());

initNoiseFieldLoader();

window.onload = function () {
  try {
    preloadAndSwapImage();
  } catch (error) {
    console.error('Error in preloadAndSwapImage:', error);
  }

  hideLoadingScreen();
};