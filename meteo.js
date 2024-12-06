document.addEventListener("DOMContentLoaded", function () {
 
fetchWeather();



});

async function fetchWeather() {
    const lat = 48.8566; 
    const lon = 2.3522; 
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=weather_code,precipitation,windspeed_10m&current_weather=true`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currentWeather = data.current_weather;
        const temperature = currentWeather.temperature;
        const windspeed = currentWeather.windspeed;
        const weatherCode = currentWeather.weathercode;
        const weatherInfo = `Température : ${temperature}°C, Vent : ${windspeed} km/h`;

        switch(weatherCode) {
            case 0:
                setInterval(createSunnySky, 5000);
                break;
            case 1:
            case 2:
            case 3:
                createCloudySky()

                break;
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
            case 80:
            case 81:
            case 82:
                setInterval(createRainDrop, 50);

                break;
            case 85:
            case 86:
            case 77:
            case 71:
            case 73:
            case 75:
            case 56:
            case 57:
                setInterval(createSnow, 100);
                break;
            case 95:
            case 96:
            case 99:

                createStormySky()
                break;

            case 5:
                document.querySelector(".topItem").src = "assets/images/snow.svg";
                break;
            default:
                setInterval(createSunnySky, 5000);
        }
        document.getElementById("weather-info").textContent = weatherInfo;

 // Mettre à jour la barre de température
 updateTemperatureBar(temperature);

 // Mettre à jour la flèche du vent
 updateWindArrow(windspeed);
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error);
        document.getElementById("weather-info").textContent = "Impossible de charger la météo.";
    }
}

// Appeler la fonction pour récupérer la météo
fetchWeather();

function createRainDrop() {
    const rainContainer = document.querySelector(".rain-container");

    const rainDrop = document.createElement("div");
    rainDrop.classList.add("rain-drop");

    rainDrop.style.left = Math.random() * rainContainer.offsetWidth + "px";

    rainDrop.style.animationDuration = Math.random() * 2 + 2 + "s";

    rainContainer.appendChild(rainDrop);

    setTimeout(() => rainDrop.remove(), 4000);
}

function createSunnySky() {
    const skyContainer = document.createElement("div");
    skyContainer.classList.add("sky-container");

    const sun = document.createElement("div");
    sun.classList.add("sun");

    const cloud1 = document.createElement("div");
    cloud1.classList.add("cloud", "cloud-1");
    const cloud2 = document.createElement("div");
    cloud2.classList.add("cloud", "cloud-2");
    const cloud3 = document.createElement("div");
    cloud3.classList.add("cloud", "cloud-3");

    skyContainer.appendChild(sun);
    skyContainer.appendChild(cloud1);
    skyContainer.appendChild(cloud2);
    skyContainer.appendChild(cloud3);

    const homeSection = document.getElementById("home");
    homeSection.appendChild(skyContainer);
}
function createCloudySky() {
    const skyContainer = document.createElement("div");
    skyContainer.classList.add("sky-container");
    skyContainer.style.background =" #aab6c3";

    const clouds = [];
    for (let i = 1; i <= 15; i++) {
        const cloud = document.createElement("div");
        cloud.classList.add("cloud", `cloud-${i}`); 
        clouds.push(cloud);
    }

    clouds.forEach(cloud => skyContainer.appendChild(cloud));

    const homeSection = document.getElementById("home");
    homeSection.appendChild(skyContainer);
}

function createStormySky() {
    const skyContainer = document.createElement("div");
    skyContainer.classList.add("sky-container");
    skyContainer.style.background = "#2f2f2f"; // Ciel sombre
        document.querySelector('h1').style.color = "white";
        document.querySelector('cite').style.color = "white";

    const clouds = [];
    for (let i = 1; i <= 10; i++) {
        const cloud = document.createElement("div");
        cloud.classList.add("cloud", `cloud-${i}`);
        clouds.push(cloud);
    }

    function createLightning() {
        const lightning = document.createElement("div");
        lightning.classList.add("lightning");
        lightning.style.left = `${Math.random() * 100}%`; 
        lightning.style.animation = "lightningFlash 0.5s ease-in-out"; 
        skyContainer.appendChild(lightning);

        setTimeout(() => lightning.remove(), 500); 
    }
    setInterval(createLightning, Math.random() * 100 + 800);

    clouds.forEach(cloud => {
        cloud.style.animation = `moveClouds ${Math.random() * 30 + 40}s linear infinite`; 
        skyContainer.appendChild(cloud);
    });

    const homeSection = document.getElementById("home");
    homeSection.appendChild(skyContainer);
}

 function createSnow() {
    const snowContainer = document.createElement("div");
    snowContainer.classList.add("snow-container");

    const homeSection = document.getElementById("home");
    homeSection.appendChild(snowContainer);

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");

        const size = Math.random() * 10 + 5; 
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        snowflake.style.left = `${Math.random() * 100}%`; 
        snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; 
        snowflake.style.animationDelay = `${Math.random() * 5}s`; 

        snowContainer.appendChild(snowflake);

        setTimeout(() => snowflake.remove(), 5000); 
    }

    setInterval(createSnowflake, 4000);
}
function updateTemperatureBar(temperature) {
    const temperatureBar = document.getElementById("temperature-bar");

    let width = Math.min(temperature, 40);
    width = Math.max(width, 0); 

    temperatureBar.style.width = `${width}%`;
}

function updateWindArrow(windspeed) {
    const windArrow = document.getElementById("wind-arrow");

    let rotationDegree = windspeed * 10; 
    windArrow.style.animationDuration = `${rotationDegree}s`;
}

