window.addEventListener("DOMContentLoaded", () => { 
    const customMenu = document.querySelector(".menu-perso");
    const customMenuButton = [...document.querySelectorAll(".menu-perso button")];
    const menuCentre = document.querySelector('.menu-centre');
    const points = document.getElementById('points');
    const nbrPoints = document.getElementById('nbrPoints');
    const main = document.querySelector('body');
    const btnMenu = document.querySelectorAll('.btn-menu');
    const imgClicker = document.querySelector('.img-clicker');
    var rotationPage = 0;
    var counter = parseInt(localStorage.getItem("counter")) || 0;
    var clickPoint = parseInt(localStorage.getItem("clickPoint")) || 1;
    var autoClick = parseInt(localStorage.getItem("autoclick")) || 0;
    var color = true;

    points.textContent = counter;
    nbrPoints.textContent = clickPoint;

    imgClicker.addEventListener('click', () => {
        alert("Non c'est l'autre clique mdr");
    });
    menuCentre.addEventListener("contextmenu", toggleCustomMenu);
    document.addEventListener("click", toggleCustomMenu);
    document.addEventListener('wheel', rotateScreen);
    customMenuButton.forEach(button => button.addEventListener("click", actionButton));
    btnMenu.forEach(btn => btn.addEventListener('click', amelioration));

    setInterval(() => {
        counter += autoClick;
        localStorage.setItem('counter', counter);
        points.textContent = counter;
    }, 1000);

    function actionButton(e) {
        e.preventDefault();
        switch(e.target.id){
            case "click": {
                counter += clickPoint;
                localStorage.setItem("counter", counter);
                points.textContent = counter;
                break;
            };
            case "moove": {
                const img = document.querySelector('.img-clicker');
                const parent = img.parentElement; // Récupère la div .menu-centre
                const padding = 150;
    
                // Dimensions de la div parent
                const parentRect = parent.getBoundingClientRect();
    
                // Calcul des limites disponibles avec le padding
                const minX = padding;
                const maxX = parentRect.width - img.offsetWidth - padding;
                const minY = padding;
                const maxY = parentRect.height - img.offsetHeight - padding;
    
                // Position aléatoire dans les limites
                const newX = Math.random() * (maxX - minX) + minX;
                const newY = Math.random() * (maxY - minY) + minY;
    
                // Applique la position à l'image
                img.style.transform = `translate(${newX}px, ${newY}px)`;
                break;
            };
            case "color": {
                const img = document.querySelector('.img-clicker');
                if(color){
                    img.src = './assets/images/clicker/marsClicker.svg';
                    btnMenu.forEach((btn, i) => {
                        const img = btn.querySelector('img');
                        if(i + 1 > 5){
                            const j = i-5;
                            img.src = `./assets/images/clicker/optionRose${j+1}.svg`;
                        }else{
                            img.src = `./assets/images/clicker/optionRose${i+1}.svg`;
                        }
                    });
                    const menuGauche = document.querySelector('.menu-gauche');
                    const menuDroite = document.querySelector('.menu-droite');
                    const menuCentre = document.querySelector('.menu-centre');

                    menuGauche.style.backgroundImage = "url('./assets/images/clicker/menuRoseClicker.png')";
                    menuDroite.style.backgroundImage = "url('./assets/images/clicker/menuRoseClicker.png')";
                    menuCentre.style.backgroundImage = "url('./assets/images/clicker/fondRoseClicker.png')";
                    color = false;
                }else{
                    img.src = './assets/images/clicker/terreClicker.svg';
                    btnMenu.forEach((btn, i) => {
                        const img = btn.querySelector('img');
                        if(i + 1 > 5){
                            const j = i-5;
                            img.src = `./assets/images/clicker/option${j+1}Clicker.svg`;
                        }else{
                            img.src = `./assets/images/clicker/option${i+1}Clicker.svg`;
                        }
                    });
                    const menuGauche = document.querySelector('.menu-gauche');
                    const menuDroite = document.querySelector('.menu-droite');
                    const menuCentre = document.querySelector('.menu-centre');

                    menuGauche.style.backgroundImage = "url('./assets/images/clicker/menuClicker.png')";
                    menuDroite.style.backgroundImage = "url('./assets/images/clicker/menuClicker.png')";
                    menuCentre.style.backgroundImage = "url('./assets/images/clicker/fondClicker.png')";
                    color = true;
                }
                break;
            }
        }
    }

    function toggleCustomMenu(e) {
        e.preventDefault();
        if(e.type === "contextmenu"){
            customMenu.style.display = "block";
            customMenu.style.transform = `translate(${e.clientX + (Math.floor(Math.random() * (250 - (-250) + 1)) + (-250))}px, ${e.clientY + (Math.floor(Math.random() * (250 - (-250) + 1)) + (-250))}px)`;
        }else if(e.type === "click" && e.target.id !== "click"){
            customMenu.style.display = "none";
        }
    };

    function rotateScreen(e) {
        e.preventDefault();
        rotationPage += 1;
        main.style.transform = `rotate(${rotationPage}deg)`;
    }

    function amelioration(e){
        switch(e.target.id){
            case "btn-menu-1": {
                if(clickPoint > 1 && counter >= 10){
                    clickPoint--;
                    counter -= 10;
                    localStorage.setItem("counter", counter);
                    localStorage.setItem("clickPoint", clickPoint);
                    points.textContent = counter;
                    nbrPoints.textContent = clickPoint;
                }
                break;
            };
            case "btn-menu-2": {
                console.log(counter);
                if(counter >= 10){
                    clickPoint++;
                    counter -= 10;
                    localStorage.setItem("counter", counter);
                    localStorage.setItem("clickPoint", clickPoint);
                    points.textContent = counter;
                    nbrPoints.textContent = clickPoint;
                }
                break;
            };
            case "btn-menu-3": {
                if(counter >= 50){
                    autoClick++;
                    counter -= 50;
                    localStorage.setItem("counter", counter);
                    localStorage.setItem("autoclick", autoClick);
                    points.textContent = counter;
                }
                break;
            };
            case "btn-menu-4": {
                if(counter >= 150){
                    const poisson = document.createElement('img');
                    const body = document.querySelector('body');
                    body.appendChild(poisson);
                    poisson.className = "poisson";
                    const choix = Math.random() < 0.5 ? 1 : 2;
                    if(choix == 1){
                        poisson.src = './assets/images/clicker/TUTUUUUUURClicker.svg';
                    }else{
                        poisson.src = './assets/images/clicker/poisson.svg';
                    }
                    setTimeout(() => {
                        poisson.style.transform = 'translateX(150vw)';
                    }, 100);
                    counter -= 150;
                }
                break;
            };
            case "btn-menu-5": {
                if(counter >= 500){
                    counter = 0;
                    autoClick = 0;
                    clickPoint = 1;
                    localStorage.clear();
                    points.textContent = counter;
                    nbrPoints.textContent = clickPoint;
                }
                break;
            };
        }
    }
});