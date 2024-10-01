let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;
let seconds = "00";

let isWorkMode = true;
let timer;

// Initial display on page load
window.onload = () => {
    // Retrieve saved values from localStorage if they exist
    if (localStorage.getItem('workTime')) {
        workTime = parseInt(localStorage.getItem('workTime'));
    }
    if (localStorage.getItem('breakTime')) {
        breakTime = parseInt(localStorage.getItem('breakTime'));
    }

    // Update the display with the retrieved values or default values
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
    // Stop the current timer
    clearInterval(timer);

    // Update the display with the current values from localStorage (or the current values from the form)
    workTime = parseInt(localStorage.getItem('workTime')) || workTime;
    breakTime = parseInt(localStorage.getItem('breakTime')) || breakTime;
    seconds = "00";

    // Update the display
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    // Show the start button and hide the reset button
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";

    // Reset classes to activate the "work" state
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
}

// Open /close the settings form
let gear = document.getElementById("gear");
let form = document.getElementById("form");

gear.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
});

// Handle form submission and save to localStorage
document.getElementById('submit-btn').addEventListener('click', function() {
    const workMinutesInput = document.getElementById('work-min').value;
    const breakMinutesInput = document.getElementById('break-min').value;
    const errorMessage = document.getElementById('error-message'); 

    // Regex to check if the input contains a dash or non-numeric characters
    const invalidInputPattern = /[^0-9]/;

    // Reset the display of the error message
    errorMessage.innerHTML = "";

    // Validate inputs to check for dashes or invalid characters
    if (invalidInputPattern.test(workMinutesInput) || invalidInputPattern.test(breakMinutesInput)) {
        errorMessage.innerHTML = "Minutes must be positive numbers without dashes or special characters.";
        return; // Stop the process if inputs are invalid
    }

    // Convert to numbers
    const workMinutes = parseInt(workMinutesInput);
    const breakMinutes = parseInt(breakMinutesInput);

    // If the input is invalid or negative, trigger an error
    if (isNaN(workMinutes) || workMinutes <= 0 || isNaN(breakMinutes) || breakMinutes <= 0 || workMinutes > 240 || breakMinutes > 240) {
        errorMessage.innerHTML = "Minutes must be valid positive numbers.";
        return;
    }

    // Stop the current timer
    clearInterval(timer);

    // Update the timer values with those from the form
    workTime = workMinutes;
    breakTime = breakMinutes;
    seconds = "00";

    // Save the values in localStorage
    localStorage.setItem('workTime', workTime);
    localStorage.setItem('breakTime', breakTime);

    // Reset the display
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    // Show the start button and hide the reset button
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";

    // Hide the form
    form.style.display = "none";

    // Reset work mode
    isWorkMode = true;
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
});
