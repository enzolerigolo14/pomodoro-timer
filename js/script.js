// variables
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 1;  
let breakTime = 1; 

let seconds = 0;  
let isPaused = false;  
let timer;
let isWorkMode = true; 

// display initial time
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";
    
    
    document.getElementById('pause').style.display = "none"; 
    document.getElementById('reset').style.display = "none"; 

    workTittle.classList.add('active');
}

// start timer
function start() {
    
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "block";  
    document.getElementById('reset').style.display = "block";  

    let workMinutes = workTime;
    let breakMinutes = breakTime;
    let breakCount = 0;
    seconds = 0; 

    // countdown function
    let timerFunction = () => {
        if (!isPaused) {
            // Update the display
            document.getElementById('minutes').innerHTML = isWorkMode ? workMinutes : breakMinutes;
            document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

            if (seconds === 0) {
               
                if (isWorkMode) {
                    if (workMinutes > 0) {
                        workMinutes--;
                    } else {
                        
                        isWorkMode = false;
                        breakMinutes = breakTime - 1;
                        workMinutes = workTime - 1;
                        breakTittle.classList.add('active');
                        workTittle.classList.remove('active');
                    }
                } else {
                    if (breakMinutes > 0) {
                        breakMinutes--;
                    } else {
                        
                        isWorkMode = true;
                        workMinutes = workTime - 1;
                        breakMinutes = breakTime - 1;
                        breakTittle.classList.remove('active');
                        workTittle.classList.add('active');
                    }
                }
                seconds = 59; 
            } else {
                seconds--;
            }
        }
    };
    timer = setInterval(timerFunction, 1000); 
}

// pause timer
function pause() {
    if (!isPaused) {
        document.getElementById('pause').innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        document.getElementById('pause').innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPaused = !isPaused; 
}

// reset timer
function reset() {
    clearInterval(timer); 
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";
    document.getElementById('start').style.display = "block";
    document.getElementById('pause').style.display = "none";
    document.getElementById('reset').style.display = "none"; 
    isPaused = false;
    isWorkMode = true; 
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
}
