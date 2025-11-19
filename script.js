window.onload = function() {
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




  

document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const menuOverlay = document.getElementById("menuOverlay");

    hamburger.addEventListener("click", function() {
        this.classList.toggle("open");
        menuOverlay.classList.toggle("show");
    });
});

document.addEventListener("DOMContentLoaded", function() {
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
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        threshold: 1 // Trigger when 50% of the element is visible
      }
    );
  
    imageContainers.forEach((container) => observer.observe(container));
  });
  




document.addEventListener("DOMContentLoaded", function() {
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

document.addEventListener('DOMContentLoaded', function() {
    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        container.addEventListener('click', function() {
            if (this.classList.contains('clicked')) {
                this.classList.remove('clicked');
            } else {
                this.classList.add('clicked');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        container.addEventListener('click', function() {
            if (this.classList.contains('clicked')) {
                this.classList.remove('clicked');
            } else {
                this.classList.add('clicked');
            }
        });
    });
});

document.querySelectorAll('.tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        // Remover la clase "active" de todas las pestañas
        document.querySelectorAll('.tab').forEach(function(t) {
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


