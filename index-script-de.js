// Text for each element
let i = 0;
const txt1 = 'Das ist Kopernikus Design.';
const txt2 = '\nWillkommen in einem neuen digitalen Kosmos.\nWir gestalten. \nWir programmieren. \nWir liefern.  \n\nKlicken Sie auf das Menü, um unser Universum zu entdecken.\n Wo Kreativität auf digitale Innovation trifft.';
const speed = 10;

// Function for the first element (h1)
function typeWriterFirst() {
    if (i < txt1.length) {
        document.getElementById("demo").innerHTML += txt1.charAt(i);
        i++;
        setTimeout(typeWriterFirst, speed);
    } else {
        // After the first line finishes, reset i and start the second line
        i = 0;
        setTimeout(typeWriterSecond, 500); // Delay before starting the second line
    }
}

// Function for the second element (p)
function typeWriterSecond() {
    if (i < txt2.length) {
        let char = txt2.charAt(i);
        if (char === '\n') {
            document.getElementById("demo2").innerHTML += '<br>';
        } else {
            document.getElementById("demo2").innerHTML += char;
        }
        i++;
        setTimeout(typeWriterSecond, speed);
    }
}

// Set up the IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start the typewriter effect when h1 comes into view
            typeWriterFirst();
            observer.unobserve(entry.target); // Stop observing after the first trigger
        }
    });
}, { threshold: 0.1 });

// Start observing the first element (h1)
observer.observe(document.getElementById("demo"));

document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector(".intro-image");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Agrega la clase visible
        }
      });
    });
  
    observer.observe(image); // Observa la imagen
  });