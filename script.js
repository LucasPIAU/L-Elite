const words = ["arbre", "soleil", "chocolat", "ordinateur", "python", "javascript"];
let targetWord = "";
let currentHash = "";
let selectedPortions = [];
let interval;
let isCounterRunning = false;
let previousNumber = null;
const COUNTDOWNTIME = 10
let remainingTime;
let countdownInterval;
let initialOrder = [];
const infoIcon = document.getElementById("info-icon");
const modal = document.getElementById("info-modal");
const closeModal = document.getElementsByClassName("close")[0];


// Fonction pour mélanger une chaîne de caractères
function shuffleString(str) {
    return str.split("").sort(() => Math.random() - 0.5).join("");
}

// Générer un hash contenant toutes les lettres de l'alphabet
function generateHash() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return shuffleString(alphabet.repeat(2));
}

// Générer un nombre aléatoire différent du précédent
function generateUniqueRandom(min, max) {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomNumber === previousNumber);
    previousNumber = randomNumber;
    return randomNumber;
}

// Initialisation du jeu
function initGame() {
    targetWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("target-word").textContent = targetWord;
    currentHash = "";
    selectedPortions = [];
    previousNumber = null;
    document.getElementById("hash").textContent = "";
    document.getElementById("selected-portions").innerHTML = "";
    document.getElementById("reconstruction-zone").innerHTML = "";
    document.getElementById("result").textContent = "";
    document.getElementById("stop-counter").disabled = true;
    document.getElementById("check-word").disabled = true;
    isCounterRunning = false;
    remainingTime = COUNTDOWNTIME;
    startCountdown();
}

// Gérer le clic sur "Générer un hash"
document.getElementById("generate-hash").addEventListener("click", () => {
    currentHash = generateHash();
    document.getElementById("hash").textContent = currentHash;
    document.getElementById("stop-counter").disabled = true;

    // Réinitialiser le compteur
    clearInterval(interval);
    document.getElementById("counter").textContent = "";

    // Démarrer le "compteur" après un délai de 2 secondes
    setTimeout(() => {
        isCounterRunning = true;
        document.getElementById("stop-counter").disabled = false;
        const randomValue = generateUniqueRandom(1, targetWord.length);
        document.getElementById("counter").textContent = randomValue;

        interval = setInterval(() => {
            const randomValue = generateUniqueRandom(1, targetWord.length);
            document.getElementById("counter").textContent = randomValue;
        }, 500); // Changement toutes les 500 ms
    }, 2000); // Délai de 2 secondes
});

// Gérer le clic sur "Stop!"
document.getElementById("stop-counter").addEventListener("click", () => {
    if (!isCounterRunning) return;

    clearInterval(interval);
    isCounterRunning = false;
    document.getElementById("stop-counter").disabled = true;

    // Permettre à l'utilisateur de choisir une partie du hash
    const hashElement = document.getElementById("hash");
    hashElement.style.cursor = "pointer";

    // Ajouter gestion survol pour prévisualiser
    hashElement.addEventListener("mousemove", handleHashHover);
    hashElement.addEventListener("click", handleHashClick);
});

// Gérer le survol du hash pour prévisualiser une portion
function handleHashHover(event) {
    const hashElement = document.getElementById("hash");
    const startIndex = getCharIndexFromMouse(event, hashElement);
    const length = parseInt(document.getElementById("counter").textContent, 10) || 0;
    const endIndex = Math.min(startIndex + length, currentHash.length);

    // Mettre en surbrillance la portion prévisualisée
    const highlightedHash =
        currentHash.slice(0, startIndex) +
        `<span class="highlight">${currentHash.slice(startIndex, endIndex)}</span>` +
        currentHash.slice(endIndex);

    hashElement.innerHTML = highlightedHash;
}

// Gérer le clic sur le hash pour confirmer une portion
function handleHashClick(event) {
    const hashElement = document.getElementById("hash");
    const startIndex = getCharIndexFromMouse(event, hashElement);
    const length = parseInt(document.getElementById("counter").textContent, 10) || 0;
    const endIndex = Math.min(startIndex + length, currentHash.length);

    // Extraire la portion
    const selection = currentHash.slice(startIndex, endIndex);
    selectedPortions.push(selection);

    // Afficher la portion sélectionnée
    const portionDiv = document.createElement("div");
    portionDiv.textContent = selection;
    portionDiv.classList.add("portion");
    portionDiv.draggable = true;

    // Ajouter la gestion du drag & drop
    portionDiv.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.textContent);
        e.target.classList.add("dragging");
    });

    portionDiv.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging");
    });

    document.getElementById("selected-portions").appendChild(portionDiv);

    // Réinitialiser le hash et désactiver les événements
    hashElement.textContent = currentHash;
    hashElement.style.cursor = "default";
    hashElement.removeEventListener("mousemove", handleHashHover);
    hashElement.removeEventListener("click", handleHashClick);

    document.getElementById("check-word").disabled = false;
}

// Calculer l'index d'un caractère à partir de la position de la souris
function getCharIndexFromMouse(event, element) {
    const rect = element.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const charWidth = rect.width / currentHash.length;
    return Math.floor(relativeX / charWidth);
}

// Gérer le drag & drop dans la zone de reconstruction (horizontal)
const reconstructionZone = document.getElementById("reconstruction-zone");

reconstructionZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingElement = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(reconstructionZone, e.clientX); // Utiliser clientX pour une gestion horizontale
    if (afterElement == null) {
        reconstructionZone.appendChild(draggingElement);
    } else {
        reconstructionZone.insertBefore(draggingElement, afterElement);
    }
});

// Fonction pour obtenir l'élément après le survol (horizontal)
function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll(".portion:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2; // Calcul horizontal
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Gérer le clic sur "Vérifier"
document.getElementById("check-word").addEventListener("click", () => {
    const reconstructedWord = Array.from(reconstructionZone.children)
        .map((block) => block.textContent)
        .join("");

    if (reconstructedWord === targetWord) {
        document.getElementById("result").textContent = "🎉 Bravo ! Tu as reconstitué le mot.";
        clearInterval(interval);
        clearInterval(countdownInterval);
    } else {
        document.getElementById("result").textContent = "❌ Ce n'est pas correct. Continue !";
    }
});

function startCountdown() {
    countdownInterval = setInterval(() => {
        remainingTime--;
        document.getElementById("countdown").textContent = `Temps restant avant le mélange: ${remainingTime}s`;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            shuffleReconstructionZone(); // Mélanger les blocs à la fin du décompte
        }
    }, 1000); // Décompte toutes les secondes
}

// Mélanger les blocs dans la zone de reconstruction
function shuffleReconstructionZone() {
    const reconstructionZone = document.getElementById("reconstruction-zone");
    const blocks = Array.from(reconstructionZone.children);

    initialOrder = blocks.map(block => block.textContent);

    let newOrder;

    // Mélanger jusqu'à ce que l'ordre soit différent de l'initial
    if (initialOrder.length >= 2) {
        do {
            newOrder = shuffleArray([...blocks]); // Faire une copie des blocs pour les mélanger
        } while (arraysEqual(initialOrder, newOrder.map(block => block.textContent)));
        newOrder.forEach(block => {
            reconstructionZone.appendChild(block);
        }); // Vérifier si l'ordre est différent
    }
   
    remainingTime = COUNTDOWNTIME;
    startCountdown();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Fonction pour vérifier si deux tableaux sont égaux
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
}

infoIcon.addEventListener("click", () => {
    modal.style.display = "block";
});

// Lorsque l'utilisateur clique sur la croix de fermeture, la modale se ferme
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fermer la modale si l'utilisateur clique en dehors de la fenêtre modale
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// Initialisation
initGame();
