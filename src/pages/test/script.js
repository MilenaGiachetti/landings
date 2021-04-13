import "./style.scss";

const next_slide = document.getElementById("next_slide");
const previous_slide = document.getElementById("previous_slide");
const slides = document.getElementsByClassName("slide");
let currentSlide = 0;

function change_slide (change) {
    slides[currentSlide].classList.add("hidden");
    if ((currentSlide + change) === (slides.length)) {
        currentSlide = 0;
    } else if ((currentSlide + change) < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide += change;
    }
    slides[currentSlide].classList.remove("hidden");
}

next_slide.addEventListener('click', ()=>change_slide(1));
previous_slide.addEventListener('click', ()=>change_slide(-1));