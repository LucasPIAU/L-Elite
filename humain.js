let currentTitle = "";
let currentExplanation = "";
let currentImageSrc = "";

function changeHeart() { 
  currentTitle = "Le coeur : Le courant océanique";
  currentExplanation = "Le cœur est comparable aux courants océaniques, comme le Gulf Stream. Tout comme le cœur pompe le sang pour irriguer l’ensemble du corps, les courants océaniques transportent l’énergie thermique et les nutriments à travers les océans, régulant ainsi le climat et soutenant la vie marine. Ce flux constant est essentiel à l’équilibre des écosystèmes, tout comme la circulation sanguine est essentielle à la santé humaine.";
  currentImageSrc = "assets/images/corail.webp";

  updateContent();
}

function changeLungs() {
  currentTitle = "Les poumons : Les récifs corralliens";
  currentExplanation = "Les poumons assurent l’oxygénation du sang, tout comme les récifs coralliens jouent un rôle vital dans la production d’oxygène. Les récifs, grâce aux algues symbiotiques qu’ils abritent, contribuent à la photosynthèse et produisent une part significative de l’oxygène mondial. Les deux fonctionnent comme des systèmes de filtration, en purifiant et en redistribuant des éléments essentiels à la vie.";
  currentImageSrc = "assets/images/corail.jpg";

  updateContent();
}

function changeStomach() {
  currentTitle = "L’estomac : Les abysses marins";
  currentExplanation = "L’estomac décompose les aliments pour en extraire les nutriments, de la même manière que les abysses marins jouent un rôle dans le cycle de décomposition. Les abysses sont des zones où les matières organiques en décomposition s’accumulent, nourrissant des écosystèmes uniques. L’estomac et les abysses transforment tous deux des éléments bruts en énergie ou en nutriments nécessaires à la vie.";
  currentImageSrc = "assets/images/abysses.jpg";

  updateContent();
}

function updateContent() {
  document.querySelector(".titreCorps").innerHTML = currentTitle;
  document.querySelector(".explicationsCorps").innerHTML = currentExplanation;
  document.querySelector('.illustrationCorps').src = currentImageSrc;
}
