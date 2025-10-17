document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector(".next");
    const prevButton = carousel.querySelector(".prev");

    // Clones pour effet infini
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = Array.from(track.children);
    let currentIndex = 1; // On commence sur la vraie première image

    // Fonction pour calculer la largeur d’un slide
    const getSlideWidth = () => slides[0].getBoundingClientRect().width;

    // Position initiale
    track.style.transform = `translateX(-${getSlideWidth() * currentIndex}px)`;

    // Fonction de déplacement
    const goToSlide = () => {
      const slideWidth = getSlideWidth();
      track.style.transition = "transform 0.4s ease-in-out";
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    };

    // Navigation flèches
    nextButton.addEventListener("click", () => {
      if (currentIndex >= allSlides.length - 1) return;
      currentIndex++;
      goToSlide();
    });

    prevButton.addEventListener("click", () => {
      if (currentIndex <= 0) return;
      currentIndex--;
      goToSlide();
    });

    // Correction du saut sur les clones
    track.addEventListener("transitionend", () => {
      const slideWidth = getSlideWidth();
      if (allSlides[currentIndex] === firstClone) {
        track.style.transition = "none";
        currentIndex = 1;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      }
      if (allSlides[currentIndex] === lastClone) {
        track.style.transition = "none";
        currentIndex = allSlides.length - 2;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      }
    });

    // Recalcule la largeur sur redimensionnement
    window.addEventListener("resize", () => {
      track.style.transition = "none";
      track.style.transform = `translateX(-${getSlideWidth() * currentIndex}px)`;
    });
  });
});
