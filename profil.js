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

// ----------------------- Récupération du pseudo et Badges ---------------------------

document.addEventListener('DOMContentLoaded', function () {
    const userName = localStorage.getItem('userName');
    const localStorageBadgesIds = localStorage.getItem('localStorageBadgesIds');
    let ownedBadges = [];
    let lockedBadges = [];


    if (userName) {
        document.getElementById('userNameDisplay').textContent = userName;
    } else {
        window.location.href = "firstConnexion.html";
        return;
    }


    const badgesFromLocalStorage = localStorageBadgesIds ? JSON.parse(localStorageBadgesIds) : [];
    console.log(badgesFromLocalStorage);


    fetch('badges.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Fichier Introuvable (badges.json)');
            }
            return response.json(); 
        })
        .then(badges => {

            badges.forEach(badge => {
                if (badgesFromLocalStorage.includes(badge.id)) {
                    ownedBadges.push(badge);
                } else {
                    lockedBadges.push(badge); 
                }
            });

            console.log(ownedBadges);
            console.log(lockedBadges);
            
            const ownedBadgesContainer = document.getElementById('ownedBadges');
            const lockedBadgesContainer = document.getElementById('lockedBadges');

            ownedBadges.forEach(badge => createBadge(badge, true));
            lockedBadges.forEach(badge => createBadge(badge, false));

            
        })
        .catch(error => {
            console.error('Error fetching badges JSON:', error);
        });
});

function createBadge(badge, owned){
    const badgeElement = document.createElement('div');
    if (owned) {
        badgeElement.classList.add('badge-owned');
    }else{
        badgeElement.classList.add('badge-locked');
    }
    const badgeTitle = document.createElement('h4');
    badgeTitle.textContent = badge.name;
    badgeElement.appendChild(badgeTitle);
    const badgeImage = document.createElement('img');
    badgeImage.src = badge.image;
    badgeElement.appendChild(badgeImage);
    const badgeDesc = document.createElement("p");
    badgeDesc.textContent = badge.description;
    badgeElement.appendChild(badgeDesc);
    document.getElementById("badges-container").appendChild(badgeElement);

}

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
