let controller;
let slideScene;
let pageScene;
let cursorDiv = document.querySelector(".cursor");
let mouseText = cursorDiv.querySelector("span");

function animateSlides() {
  // Initialize Controller
  controller = new ScrollMagic.Controller();

  // Select Stuffs
  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  slides.forEach((slide, index, sliders) => {
    const revealImage = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    // Gsap
    const slideTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power2.inOut",
      },
    });
    slideTl.fromTo(revealImage, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: "2" }, { scale: "1" }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.75");
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addTo(controller);

    // Page Animation
    const pageTl = gsap.timeline();
    let nextSlide = sliders.length - 1 !== index && sliders[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    // Page Scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

function cursor({ pageX, pageY }) {
  cursorDiv.style.top = pageY + "px";
  cursorDiv.style.left = pageX + "px";
}

function animateCursor({ target }) {
  if (target.id === "logo" || target.classList.contains("hamburger")) {
    cursorDiv.classList.add("nav-active");
  } else {
    cursorDiv.classList.remove("nav-active");
  }
  if (target.classList.contains("explore")) {
    cursorDiv.classList.add("explorer-active");
    mouseText.innerText = "Tap";
  } else {
    cursorDiv.classList.remove("explorer-active");
    mouseText.innerText = "";
  }
}

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", animateCursor);
animateSlides();
