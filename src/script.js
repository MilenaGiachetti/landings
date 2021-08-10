import "./style.scss";

window.onload = function() {
    function resizeGridItems() {
        document.querySelectorAll(".card-container").forEach(card => {
            let height = card.querySelector(".card").getBoundingClientRect().height;
            let rows = Math.ceil(height / 5);
            card.style.gridRowEnd = 'span ' + rows;
        });
    }

    let fadeIns = [];
    document.querySelectorAll(".card-container").forEach(card => {
        card.addEventListener('click', () => {            
            fadeIns.forEach(element => element.classList.remove("fadeIn"));
            card.querySelector(".card").classList.add("fadeIn");
            card.querySelector(".close").classList.add("fadeIn");
            fadeIns.length = 0;
            fadeIns.push(card.querySelector(".card"));
            fadeIns.push(card.querySelector(".close"));
        });
    });

    document.querySelectorAll(".close").forEach(btn => {
        btn.addEventListener('click', (e) => {
            btn.closest(".card").classList.remove("fadeIn");
            btn.classList.remove("fadeIn");
            e.stopPropagation();
        });
    });

    resizeGridItems();
    window.addEventListener("resize",  () => resizeGridItems());
};