let start = document.getElementById('start');
let reset = document.getElementById('reset');
let stop = document.getElementById('stop');
let clearCount = document.getElementById('clear-count');

let countNum = 0;
let counter = 0;

let focusInputField = document.getElementById('focus-input');
let breakInputField = document.getElementById('focus-break');

let wm = document.getElementById('w-minutes');
let ws = document.getElementById('w-seconds');

let bm = document.getElementById('b-minutes');
let bs = document.getElementById('b-seconds');

let startTimer;

// Start timer button
start.addEventListener('click', function(){
  if (wm.innerText <= 0 && ws.innerText == 0) {
    alert("Please enter focus time!")
  } else if(bm.innerText <= 0 && bs.innerText == 0) {
    alert("Please enter break time!")
  }else if(startTimer === undefined) {
    startTimer = setInterval(timer, 1000)
    focusInputField.value = '';
    breakInputField.value = '';
    clearInterval(stop)
  } else {
    alert("Timer is already running!")
  }
})

// User work time input 
focusInputField.addEventListener('input', function() {
  if(startTimer === undefined ) {
    wm.innerText = focusInputField.value;
     } 
     if (focusInputField.value === undefined) {
       wm.innerText = "0";
     }
})

// User break time input 
breakInputField.addEventListener('input', function() {
  if(startTimer === undefined ) {
    bm.innerText = breakInputField.value;
     } 
     if (breakInputField.value === undefined) {
       bm.innerText = "0";
     }

})

// Stop timer button
stop.addEventListener('click', function(){
  if(startTimer != undefined) {
    clearInterval(startTimer);
    startTimer = undefined;
  } else if (startTimer === undefined) {
    alert("Timer is already stopped!")
  }
})

// Reset timer button
reset.addEventListener('click', function(){
  clearInterval(startTimer);
  startTimer = undefined;
  wm.innerText = "0";
  ws.innerText = "00";
  bm.innerText = "0";
  bs.innerText = "00";
})

// Decrement seconds and minutes after timer start
function timer() {
  if(ws.innerText != 0) {
    ws.innerText--;
       // add leading zero to break seconds
       if (ws.innerText <10 && ws.innerText != 0) {
        ws.innerText = `0${ws.innerText}`;
      }
  }else if(wm.innerText != 0 && ws.innerText == 0) {
    ws.innerText = 59;
    wm.innerText--;
  } 
  if(wm.innerText == 0 && ws.innerText == 0) {
    if(bs.innerText != 0) {
      bs.innerText--;
        // Add leading zero to work seconds < 10
        if (bs.innerText <10 && bs.innerText != 0){
        bs.innerText = `0${bs.innerText}`;
        }
    } else if(bm.innerText != 0 && bs.innerText == 0){
      bs.innerText = 59;
      bm.innerText--;
    } else if (bm.innerText == 0 && bs.innerText == 0) {
      clearInterval(startTimer);
      startTimer = undefined;
      wm.innerText = "0";
      ws.innerText = "00";
      bm.innerText = "0";
      bs.innerText = "00";
      counter++;
      localStorage.setItem('count', counter);
      console.log(counter);
      console.log(localStorage.getItem('count'));
      countDisplayCheck();
    }
  }
 }

  function countDisplayCheck() {
    counter = localStorage.getItem('count');
    document.getElementById('counter-count').innerText = counter;
}

clearCount.addEventListener('click', function(){
  localStorage.removeItem('count');
  counter = 0;
  document.getElementById('counter-count').innerText = counter;
})
