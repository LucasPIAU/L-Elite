// Génération aléatoire de photo de profil
const profilePictures = [
    './profilPictures/image1.jpg', 
    './profilPictures/image2.jpg',
    './profilPictures/image3.jpg'
];

// Fonction pour sélectionner une photo de profil aléatoire et l'afficher
function setRandomProfilePicture() {
    const randomIndex = Math.floor(Math.random() * profilePictures.length);
    const randomImage = profilePictures[randomIndex];
    const profilPictureElement = document.getElementById('profil-picture');
    profilPictureElement.src = randomImage;

    if (profilPictureElement) {
        profilPictureElement.src = randomImage;
    } else {
        console.error('L\'élément profil-picture n\'a pas été trouvé');
    }
}
document.addEventListener('DOMContentLoaded', setRandomProfilePicture);

// ----------------------- Récupération du pseudo ---------------------------

document.addEventListener('DOMContentLoaded', function () {
    const userName = localStorage.getItem('userName');

    if (userName) {
        document.getElementById('userNameDisplay').textContent = userName;
    } else {
        document.getElementById('userNameDisplay').textContent = 'Utilisateur inconnu';
    }
});

// ----------------------- Gestion des points ---------------------------

// Fonction pour récupérer les points depuis le localStorage
function getPoints() {
    const points = localStorage.getItem('userPoints');
    return points ? parseInt(points, 10) : 0;  // Retourne 0 si aucun point n'est trouvé
}

// Fonction pour mettre à jour les points dans le localStorage
function updatePoints(points) {
    localStorage.setItem('userPoints', points);
    displayPoints(); // Met à jour l'affichage des points
}

// Fonction pour ajouter des points
function addPoints(pointsToAdd) {
    const currentPoints = getPoints();
    const newPoints = currentPoints + pointsToAdd; 
    updatePoints(newPoints);  // Met à jour les points dans le localStorage
}

// Fonction pour afficher les points sur la page
function displayPoints() {
    const pointsDisplay = document.getElementById('userPointsDisplay');
    const points = getPoints();  // Récupère les points depuis le localStorage
    pointsDisplay.textContent = `Points: ${points}`;
}

// Appel initial pour afficher les points au chargement de la page
document.addEventListener('DOMContentLoaded', displayPoints);
