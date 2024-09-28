

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;
let seconds = "00";

let isWorkMode = true;
let breakCount = 0;
let timer;

// Affichage initial
window.onload = () => {
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

    // Réinitialise les valeurs par défaut
    isWorkMode = true;
    workTime = 25;
    breakTime = 5;
    seconds = "00";

    // Met à jour l'affichage
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

// Soumettre les valeurs du formulaire
document.getElementById('submit-btn').addEventListener('click', function() {
    const workMinutesInput = document.getElementById('work-min').value;
    const breakMinutesInput = document.getElementById('break-min').value;

    // Arrêter le timer en cours
    clearInterval(timer);

    // Mettre à jour les valeurs du timer avec celles du formulaire
    workTime = parseInt(workMinutesInput) || 25;
    breakTime = parseInt(breakMinutesInput) || 5;
    seconds = "00";

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

