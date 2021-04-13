import "./style.scss";

let cards = document.getElementsByClassName("card");
function resizeGridItems() {
    console.log("here2");
    for (let i = 0; i < cards.length; i ++){
        let height = cards[i].querySelector(".card-body").getBoundingClientRect().height;
        console.log(height);
        let rows = Math.ceil(height / 20);
        cards[i].style.gridRowEnd = 'span ' + rows;
    }
}
resizeGridItems();
window.addEventListener("resize",  () => resizeGridItems());