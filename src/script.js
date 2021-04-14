import "./style.scss";

window.onload = function() {
    function resizeGridItems() {
        document.querySelectorAll(".card").forEach(card => {
            let height = card.querySelector(".card-body").getBoundingClientRect().height;
            let rows = Math.ceil(height / 5);
            card.style.gridRowEnd = 'span ' + rows;
        });
    }

    let fadeIns = [];
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener('click', () => {            
            fadeIns.forEach(element => element.classList.remove("fadeIn"));
            card.querySelector(".card-content").classList.add("fadeIn");
            card.querySelector(".close").classList.add("fadeIn");
            fadeIns.length = 0;
            fadeIns.push(card.querySelector(".card-content"));
            fadeIns.push(card.querySelector(".close"));
            resizeGridItems();
        });
    });

    document.querySelectorAll(".close").forEach(btn => {
        btn.addEventListener('click', (e) => {
            btn.parentElement.querySelector(".card-content").classList.remove("fadeIn");
            btn.classList.remove("fadeIn");
            resizeGridItems();
            e.stopPropagation();
        });
    });

    resizeGridItems();
    window.addEventListener("resize",  () => resizeGridItems());
};