document.addEventListener('DOMContentLoaded', function () {


    // Liste des pages du site
    const pages = [
        "/",      
        "/profil.html",         
        "/firsConnexion.html",      
        // "/clicker.html"       
    ];

    // Étape 1 : Vérifier si l'utilisateur a visité toutes les pages
    let visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];

    // Récupérer l'URL de la page actuelle
    const currentPage = window.location.pathname;

    // Ajouter la page actuelle à visitedPages si elle n'y est pas déjà
    if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
        console.log("Okay");
    }

    // Étape 2 : Vérifier si toutes les pages ont été visitées
    if (visitedPages.length === pages.length && !visitedPages.includes('/readAllTheSiteBadge')) {
        // Ajouter le badge "readAllTheSite" dans localStorage
        addBadgeToLocalStorage('readAllTheSite');
        visitedPages.push('/readAllTheSiteBadge'); // Marquer que le badge a été ajouté
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
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
