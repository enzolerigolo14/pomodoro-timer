// variables
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');


let workTime = 25;  
let breakTime = 5; 

// let seconds = 0;  
let isPaused = false;  
let timer;
let isWorkMode = true; 

// display initial time
window.onload = () => {
    if(localStorage.getItem("workKey") == null){
        document.getElementById('minutes').innerHTML = workTime;
        document.getElementById('seconds').innerHTML = "00";
        
        
        document.getElementById('reset').style.display = "none"; 
    
        workTittle.classList.add('active');
    }
    else{    
    document.getElementById('minutes').innerHTML = localStorage.getItem("workKey");
    document.getElementById('seconds').innerHTML = "00";
    
    
    document.getElementById('reset').style.display = "none"; 

    workTittle.classList.add('active');}

}

// start timer
function start() {
    
    document.getElementById('start').style.display = "none";
 
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

function reset() {
    workTime=workMinutes
    breakTime=breakMinutes
}

let gear = document.getElementById("gear");
let form = document.getElementById("form");

gear.addEventListener("click", () => {
    if(getComputedStyle(form).display != "none"){
      form.style.display = "none";
    } else {
      form.style.display = "block";
    }
  })

document.getElementById('submit-btn').addEventListener('click', function() {

    const workMinutes = document.getElementById('work-min').value;
    const breakMinutes = document.getElementById('break-min').value;
    console.log(workMinutes)
    localStorage.setItem("workKey",workMinutes)
    localStorage.setItem("breakKey",breakTime)
    form.style.display = "none";
    
});