let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;
let seconds = "00";

let isWorkMode = true;
let timer;

// Affichage initial au chargement de la page
window.onload = () => {
    // Récupérer les valeurs sauvegardées dans localStorage si elles existent
    if (localStorage.getItem('workTime')) {
        workTime = parseInt(localStorage.getItem('workTime'));
    }
    if (localStorage.getItem('breakTime')) {
        breakTime = parseInt(localStorage.getItem('breakTime'));
    }

    // Mettre à jour l'affichage avec les valeurs récupérées ou les valeurs par défaut
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;
    workTittle.classList.add('active');
}

// Start timer
function start() {
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;
    seconds = 59;

    let timerFunction = () => {
        document.getElementById('minutes').innerHTML = isWorkMode ? workMinutes : breakMinutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        seconds--;

        if (seconds === 0) {
            if (isWorkMode) {
                if (workMinutes > 0) {
                    workMinutes--;
                } else {
                    isWorkMode = false;
                    breakMinutes = breakTime - 1;
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                }
            } else {
                if (breakMinutes > 0) {
                    breakMinutes--;
                } else {
                    isWorkMode = true;
                    workMinutes = workTime - 1;
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    };
    timer = setInterval(timerFunction, 1000);
}

function reset() {
    // Arrête le timer en cours
    clearInterval(timer);

    // Mettre à jour l'affichage avec les valeurs actuelles du localStorage (ou les valeurs actuelles du formulaire)
    workTime = parseInt(localStorage.getItem('workTime')) || workTime;
    breakTime = parseInt(localStorage.getItem('breakTime')) || breakTime;
    seconds = "00";

    // Mettre à jour l'affichage
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    // Réaffiche le bouton start et masque le bouton reset
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";

    // Réinitialise les classes pour activer l'état "work"
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
}

// Ouvrir/fermer le formulaire de settings
let gear = document.getElementById("gear");
let form = document.getElementById("form");

gear.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
});

// Gérer la soumission du formulaire et sauvegarder dans localStorage
document.getElementById('submit-btn').addEventListener('click', function() {
    const workMinutesInput = document.getElementById('work-min').value;
    const breakMinutesInput = document.getElementById('break-min').value;
    const errorMessage = document.getElementById('error-message'); // Element where the error will be displayed

    // Regex pour vérifier si l'entrée contient un tiret ou des caractères non numériques
    const invalidInputPattern = /[^0-9]/;

    // Réinitialiser l'affichage du message d'erreur
    errorMessage.innerHTML = "";

    // Valider les entrées pour vérifier la présence de tirets ou de caractères invalides
    if (invalidInputPattern.test(workMinutesInput) || invalidInputPattern.test(breakMinutesInput)) {
        errorMessage.innerHTML = "Les minutes doivent être des nombres positifs sans tirets ni caractères spéciaux.";
        return; // Arrêter le processus si les entrées sont invalides
    }

    // Convertir en nombres
    const workMinutes = parseInt(workMinutesInput);
    const breakMinutes = parseInt(breakMinutesInput);

    // Si l'entrée est invalide ou négative, déclencher une erreur
    if (isNaN(workMinutes) || workMinutes <= 0 || isNaN(breakMinutes) || breakMinutes <= 0 || workMinutes > 120 || breakMinutes > 120) {
        errorMessage.innerHTML = "Les minutes doivent être des nombres valides et positifs.";
        return;
    }

    // Arrêter le timer en cours
    clearInterval(timer);

    // Mettre à jour les valeurs du timer avec celles du formulaire
    workTime = workMinutes;
    breakTime = breakMinutes;
    seconds = "00";

    // Sauvegarder les valeurs dans le localStorage
    localStorage.setItem('workTime', workTime);
    localStorage.setItem('breakTime', breakTime);

    // Réinitialiser l'affichage
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    // Réafficher le bouton start et masquer le bouton reset
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";

    // Cacher le formulaire
    form.style.display = "none";

    // Réinitialiser le mode de travail
    isWorkMode = true;
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
});