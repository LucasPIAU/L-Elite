window.addEventListener("DOMContentLoaded", () => { 
    const customMenu = document.querySelector(".menu-perso");
    const customMenuButton = [...document.querySelectorAll(".menu-perso button")];
    var counter = parseInt(localStorage.getItem("counter")) || 0;
    var clickPoint = parseInt(localStorage.getItem("clickPoint")) || 1; 

    document.addEventListener("contextmenu", toggleCustomMenu);
    document.addEventListener("click", toggleCustomMenu);
    customMenuButton.forEach(button => button.addEventListener("click", actionButton));

    function actionButton(e) {
        e.preventDefault();
        switch(e.target.id){
            case "click": {
                counter += clickPoint;
                localStorage.setItem("counter", counter);
                console.log(counter);
            }
        }
    }


    function toggleCustomMenu(e) {
        e.preventDefault();
        if(e.type === "contextmenu"){
            customMenu.style.display = "block";
            customMenu.style.transform = `translate(${e.clientX + (Math.floor(Math.random() * (500 - (-500) + 1)) + (-500))}px, ${e.clientY + (Math.floor(Math.random() * (500 - (-500) + 1)) + (-500))}px)`;
        }else if(e.type === "click" && e.target.id !== "click"){
            customMenu.style.display = "none";
        }
    };

});