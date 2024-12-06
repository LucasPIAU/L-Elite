const words = ["arbre", "soleil", "chocolat", "ordinateur", "python", "javascript", "beurre", "ocean", "refresh", "powershell"];
let targetWord = "";
let shuffledString = "";
let selectedPortions = [];
let interval;
let isCounterRunning = false;
let previousNumber = null;
const COUNTDOWNTIME = 10;
let remainingTime;
let countdownInterval;
let initialOrder = [];
const infoIcon = document.getElementById("info-icon");
const modal = document.getElementById("info-modal");
const confirmationModal = document.getElementById("confirmation-modal");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");
const closeModal = document.getElementsByClassName("close")[0];

// Fonction pour ouvrir la modal de confirmation
function openConfirmationModal(action) {
    confirmationModal.style.display = "block"; // Afficher la modal
    actionToExecute = action; // Sauvegarder l'action à exécuter après confirmation
}

// Fonction pour fermer la modal de confirmation
function closeConfirmationModal() {
    confirmationModal.style.display = "none"; // Cacher la modal
    actionToExecute = null; // Réinitialiser l'action après fermeture de la modal
}

// Lorsque l'utilisateur clique sur "Oui", exécuter l'action
confirmBtn.addEventListener("click", () => {
    if (actionToExecute) {
        actionToExecute(); // Exécuter l'action sauvegardée
    }
    closeConfirmationModal(); // Fermer la modal après exécution
});

// Lorsque l'utilisateur clique sur "Non", fermer la modal sans exécuter l'action
cancelBtn.addEventListener("click", () => {
    closeConfirmationModal(); // Fermer la modal
});

// Lorsque l'utilisateur clique sur "X", fermer la modal
closeModal.addEventListener("click", () => {
    closeConfirmationModal(); // Fermer la modal
});

// Lorsque l'utilisateur clique en dehors de la modal, fermer la modal
window.addEventListener("click", (event) => {
    if (event.target === confirmationModal) {
        closeConfirmationModal(); // Fermer la modal si l'utilisateur clique à l'extérieur
    }
});

// Fonction pour mélanger une chaîne de caractères
function shuffleString(str) {
    return str.split("").sort(() => Math.random() - 0.5).join("");
}

// Générer un string mélangé contenant toutes les lettres de l'alphabet
function generateShuffledString() {
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
    shuffledString = "";
    selectedPortions = [];
    previousNumber = null;
    document.getElementById("shuffledString").textContent = "";
    document.getElementById("selected-portions").innerHTML = "";
    document.getElementById("reconstruction-zone").innerHTML = "";
    document.getElementById("result").textContent = "";
    document.getElementById("stop-counter").disabled = true;
    document.getElementById("generate-shuffledString").disabled = false;
    document.getElementById("check-word").disabled = true;
    isCounterRunning = false;
    remainingTime = COUNTDOWNTIME;
    startCountdown();
}

// Gérer le clic sur "Générer un shuffled string"
document.getElementById("generate-shuffledString").addEventListener("click", () => {
    openConfirmationModal(() => {
        shuffledString = generateShuffledString();
        document.getElementById("shuffledString").textContent = shuffledString;
        document.getElementById("stop-counter").disabled = true;
        document.getElementById("generate-shuffledString").disabled = true;

        // Réinitialiser le compteur
        clearInterval(interval);
        document.getElementById("counter").textContent = "";

        // Démarrer le "compteur" après un délai de 2 secondes

        isCounterRunning = true;
        document.getElementById("stop-counter").disabled = false;
        const randomValue = generateUniqueRandom(1, targetWord.length);
        document.getElementById("counter").textContent = randomValue;

        interval = setInterval(() => {
            const randomValue = generateUniqueRandom(1, targetWord.length);
            document.getElementById("counter").textContent = randomValue;
        }, 500); // Changement toutes les 500 ms

    })
});

// Gérer le clic sur "Stop!"
document.getElementById("stop-counter").addEventListener("click", () => {
    if (!isCounterRunning) return;

    clearInterval(interval);
    isCounterRunning = false;
    document.getElementById("stop-counter").disabled = true;
    document.getElementById("generate-shuffledString").disabled = false;

    // Permettre à l'utilisateur de choisir une partie du shuffled string
    const shuffledStringElement = document.getElementById("shuffledString");
    shuffledStringElement.style.cursor = "pointer";

    // Ajouter gestion survol pour prévisualiser
    shuffledStringElement.addEventListener("mousemove", handleShuffledStringHover);
    shuffledStringElement.addEventListener("click", handleShuffledStringClick);
});

// Gérer le survol du shuffled string pour prévisualiser une portion
function handleShuffledStringHover(event) {
    const shuffledStringElement = document.getElementById("shuffledString");
    const startIndex = getCharIndexFromMouse(event, shuffledStringElement);
    const length = parseInt(document.getElementById("counter").textContent, 10) || 0;
    const endIndex = Math.min(startIndex + length, shuffledString.length);

    // Mettre en surbrillance la portion prévisualisée
    const highlightedShuffledString =
        shuffledString.slice(0, startIndex) +
        `<span class="highlight">${shuffledString.slice(startIndex, endIndex)}</span>` +
        shuffledString.slice(endIndex);

    shuffledStringElement.innerHTML = highlightedShuffledString;
}

// Gérer le clic sur le shuffled string pour confirmer une portion
function handleShuffledStringClick(event) {
    openConfirmationModal(() => {
        const shuffledStringElement = document.getElementById("shuffledString");
        const startIndex = getCharIndexFromMouse(event, shuffledStringElement);
        const length = parseInt(document.getElementById("counter").textContent, 10) || 0;
        const endIndex = Math.min(startIndex + length, shuffledString.length);

        // Extraire la portion
        const selection = shuffledString.slice(startIndex, endIndex);
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

        // Réinitialiser le shuffled string et désactiver les événements
        shuffledStringElement.textContent = shuffledString;
        shuffledStringElement.style.cursor = "default";
        shuffledStringElement.removeEventListener("mousemove", handleShuffledStringHover);
        shuffledStringElement.removeEventListener("click", handleShuffledStringClick);

        document.getElementById("check-word").disabled = false;
    })
}

// Calculer l'index d'un caractère à partir de la position de la souris
function getCharIndexFromMouse(event, element) {
    const rect = element.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const charWidth = rect.width / shuffledString.length;
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
    openConfirmationModal(() => {
        const reconstructedWord = Array.from(reconstructionZone.children)
            .map((block) => block.textContent)
            .join("");

        if (reconstructedWord === targetWord) {
            clearInterval(interval);
            clearInterval(countdownInterval);
            window.location.href = "congrats.html";
        } else {
            document.getElementById("result").textContent = "❌ Ce n'est pas correct. Continue !";
        }
    })
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
    openConfirmationModal(()=>{
        modal.style.display = "block";
    })
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
