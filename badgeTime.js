document.addEventListener('DOMContentLoaded', function () {
    const localStorageBadgesIds = localStorage.getItem('localStorageBadgesIds');

    // Vérifier si l'utilisateur a déjà une session en cours
    const sessionStart = localStorage.getItem('sessionStart');
    const currentTime = Date.now();  // Heure actuelle en millisecondes

    // Si l'utilisateur n'a pas encore commencé la session, enregistrer l'heure de début
    if (!sessionStart) {
        localStorage.setItem('sessionStart', currentTime);
    }

    // Calculer le temps passé sur le site
    const timeSpent = (currentTime - sessionStart) / 1000;  // Temps écoulé en secondes

    // Ajouter le badge "30min" si l'utilisateur a passé 30 minutes sur le site
    if (timeSpent >= 1800 && !localStorageBadgesIds.includes('timeOnSite')) {
        addBadgeToLocalStorage('timeOnSite');
    }

    // Ajouter le badge à localStorage
    function addBadgeToLocalStorage(badgeId) {
        let currentBadges = JSON.parse(localStorage.getItem('localStorageBadgesIds')) || [];
        if (!currentBadges.includes(badgeId)) {
            currentBadges.push(badgeId);
            localStorage.setItem('localStorageBadgesIds', JSON.stringify(currentBadges));
        }
    }

});
 