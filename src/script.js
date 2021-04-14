import "./style.scss";

let cards = document.getElementsByClassName("card");
function resizeGridItems() {
    for (let i = 0; i < cards.length; i ++){
        let height = cards[i].querySelector(".card-body").getBoundingClientRect().height;
        let rows = Math.ceil(height / 5);
        cards[i].style.gridRowEnd = 'span ' + rows;
    }
}
resizeGridItems();
window.addEventListener("resize",  () => resizeGridItems());
let fadeIns = [];

for (let i = 0; i < cards.length; i ++){
    cards[i].addEventListener('click', () => {
        console.log(fadeIns)
        if(fadeIns.length > 0) {
            for (let j = 0; j < fadeIns.length; j ++){
                console.log(fadeIns[j])
                fadeIns[j].classList.remove("fadeIn");
            }
        }
        cards[i].querySelector(".card-content").classList.add("fadeIn");
        cards[i].querySelector(".close").classList.add("fadeIn");
        fadeIns.length = 0;
        fadeIns.push(cards[i].querySelector(".card-content"));
        fadeIns.push(cards[i].querySelector(".close"));

        resizeGridItems();
    });
}

let close = document.getElementsByClassName("close");

for (let i = 0; i < close.length; i ++){
    close[i].addEventListener('click', (e) => {
        close[i].parentElement.querySelector(".card-content").classList.remove("fadeIn");
        close[i].classList.remove("fadeIn");
        resizeGridItems();
        e.stopPropagation();
    });
}
