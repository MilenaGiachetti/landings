import "./style.scss";

const next_slide = document.getElementById("next_slide");
const previous_slide = document.getElementById("previous_slide");
const slides_image = document.getElementsByClassName("img_ctn");
const slides_text = document.getElementsByClassName("txt_ctn");
let currentSlide = 0;
const total_slides = slides_image.length;

function change_slide (change) {
    slides_image[currentSlide].classList.add("hidden");
    slides_text[currentSlide].classList.add("hidden");
    if ((currentSlide + change) === (total_slides)) {
        currentSlide = 0;
    } else if ((currentSlide + change) < 0) {
        currentSlide = total_slides - 1;
    } else {
        currentSlide += change;
    }
    slides_image[currentSlide].classList.remove("hidden");
    slides_text[currentSlide].classList.remove("hidden");
}

next_slide.addEventListener('click', ()=>change_slide(1));
previous_slide.addEventListener('click', ()=>change_slide(-1));