window.onload = function () {
  try {
    preloadAndSwapImage();
  } catch (error) {
    console.error('Error in preloadAndSwapImage:', error);
  }

  // Ocultar el loader
  document.getElementById('loadingScreen').style.display = 'none';
};


function isWeChatBrowser() {
  return /MicroMessenger/i.test(navigator.userAgent);
}

window.addEventListener("DOMContentLoaded", function () {
  if (isWeChatBrowser()) {
    const videoBlocks = document.querySelectorAll('.wechat-video-wrapper');

    videoBlocks.forEach((block, index) => {
      const gifSrc = block.dataset.gif;

      // Replace video with corresponding GIF
      block.innerHTML = `
          <img src="${gifSrc}"
               alt="Animated Services GIF ${index + 1}"
               class="wechat-services-gif"
               style="width: 80%; height: auto; display: block; margin: 0 auto;" />
        `;
    });
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const menuOverlay = document.getElementById("menuOverlay");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("open");
    menuOverlay.classList.toggle("show");
  });

  // Cerrar el menú al hacer click en cualquier enlace
  const menuLinks = menuOverlay.querySelectorAll("a");
  menuLinks.forEach(link => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("open");
      menuOverlay.classList.remove("show");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll('.image-animate');

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  images.forEach(image => {
    observer.observe(image);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const imageContainers = document.querySelectorAll(".image-transition");
  const infoButtons = document.querySelectorAll(".card .send-button");
  const animatedInfoButtons = Array.from(infoButtons).filter((button) => !button.closest(".contact-form"));

  animatedInfoButtons.forEach((button) => button.classList.add("scroll-fade"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("in-view");
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.35
    }
  );
  imageContainers.forEach((container) => observer.observe(container));
  const buttonObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.35
    }
  );

  animatedInfoButtons.forEach((button) => buttonObserver.observe(button));
});





document.addEventListener("DOMContentLoaded", function () {
  let elements = document.querySelectorAll('.text-animate, .gif-animate');

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => {
    observer.observe(element);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const imageContainers = document.querySelectorAll('.image-container');

  imageContainers.forEach(container => {
    container.addEventListener('click', function () {
      if (this.classList.contains('clicked')) {
        this.classList.remove('clicked');
      } else {
        this.classList.add('clicked');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const imageContainers = document.querySelectorAll('.image-container');

  imageContainers.forEach(container => {
    container.addEventListener('click', function () {
      if (this.classList.contains('clicked')) {
        this.classList.remove('clicked');
      } else {
        this.classList.add('clicked');
      }
    });
  });
});

document.querySelectorAll('.tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    // Remover la clase "active" de todas las pestañas
    document.querySelectorAll('.tab').forEach(function (t) {
      t.classList.remove('active');
    });
    // Agregar la clase "active" a la pestaña seleccionada
    this.classList.add('active');
  });
});


document.fonts.ready.then(() => {
  const sections = document.querySelectorAll('.card-body-intro');
  sections.forEach(section => {
    section.classList.remove('font-loading');
    section.classList.add('font-loaded');
  });
});

// Efecto fade global - funciona con cualquier elemento que tenga clase .deck-fade
document.addEventListener("DOMContentLoaded", function () {
  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  function initDeckFade(deck) {
    var images = deck.querySelectorAll('.deck-image');
    var currentIndex = 0;
    var intervalId = null;
    var isActive = false;

    function changeImage() {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }

    function startFade() {
      if (!intervalId) {
        intervalId = setInterval(changeImage, 1500);
      }
    }

    function stopFade() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        images[currentIndex].classList.remove('active');
        currentIndex = 0;
        images[currentIndex].classList.add('active');
        isActive = false;
      }
    }

    if (isTouchDevice) {
      deck.addEventListener('click', function (ev) {
        ev.stopPropagation();
        isActive = !isActive;
        isActive ? startFade() : stopFade();
      });
    } else {
      deck.addEventListener('mouseenter', startFade);
      deck.addEventListener('mouseleave', stopFade);
    }

    // Expose stopFade so the global click handler can call it
    deck._stopFade = function () {
      if (isActive) { stopFade(); }
    };
  }

  var decks = document.querySelectorAll('.deck-fade');
  for (var i = 0; i < decks.length; i++) {
    initDeckFade(decks[i]);
  }

  // Single global listener to stop all fades when tapping outside
  if (isTouchDevice) {
    document.addEventListener('click', function (ev) {
      for (var i = 0; i < decks.length; i++) {
        if (!decks[i].contains(ev.target)) {
          decks[i]._stopFade();
        }
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const supportsObserver = typeof IntersectionObserver === "function";
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animatedTargets = [];

  document.querySelectorAll('.card .card-body').forEach((cardBody) => {
    const title = cardBody.querySelector('h1, h2, h3');
    const textBlocks = cardBody.querySelectorAll('p');

    if (title) {
      title.classList.add('reveal-on-scroll');
      title.style.transitionDelay = '0ms';
      animatedTargets.push(title);
    }

    textBlocks.forEach((text, index) => {
      text.classList.add('reveal-on-scroll');
      text.style.transitionDelay = `${120 + (index * 90)}ms`;
      animatedTargets.push(text);
    });
  });

  if (!animatedTargets.length) {
    return;
  }

  if (!supportsObserver || prefersReducedMotion) {
    animatedTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -8% 0px'
  });

  animatedTargets.forEach((target) => observer.observe(target));
});

// Función reutilizable para setup de toggles de servicio
function setupServiceToggle(container = document) {
  const serviceTriggers = container.querySelectorAll('.service-trigger');
  const serviceItems = container.querySelectorAll('.service-item');

  serviceTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const currentItem = trigger.parentElement;

      serviceItems.forEach(item => {
        item.classList.remove('active');
      });

      currentItem.classList.add('active');
    });
  });
}

// Inicializar para el documento completo
document.addEventListener('DOMContentLoaded', function () {
  setupServiceToggle();
});

