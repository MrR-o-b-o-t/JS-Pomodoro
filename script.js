let start = document.getElementById('start');
let reset = document.getElementById('reset');
let stop = document.getElementById('stop');

let focusInputField = document.getElementById('focus-input');

let wm = document.getElementById('w-minutes');
let ws = document.getElementById('w-seconds');

let bm = document.getElementById('b-minutes');
let bs = document.getElementById('b-seconds');

let startTimer;

start.addEventListener('click', function(){
  if(startTimer === undefined) {
    startTimer = setInterval(timer, 1000)
    focusInputField.value = '';
  } else {
    alert("Timer is already running!")
  }
})

focusInputField.addEventListener('input', function() {
  if(startTimer === undefined ) {
    wm.innerText = focusInputField.value;
    wm.innerText = focusInputField.value;
     if(wm.innerText < 10) {
       wm.innerText = "0" + wm.innerText;
     } else if (focusInputField.value === undefined) {
       wm.innerText = "00";
     }
  }
})

stop.addEventListener('click', function(){
  if(startTimer != undefined) {
    clearInterval(startTimer);
    startTimer = undefined;
  } else if (startTimer === undefined) {
    alert("Timer is already stopped!")
  }
})

reset.addEventListener('click', function(){
  clearInterval(startTimer);
  startTimer = undefined;
  wm.innerText = "00";
  ws.innerText = "00";
  bm.innerText = 1;
  bs.innerText = "00";
})

function timer() {
  if(ws.innerText != 0) {
    ws.innerText--;
  } else if(wm.innerText != 0 && ws.innerText == 0) {
    ws.innerText = 59;
    wm.innerText--;
  }

  if(wm.innerText == 0 && ws.innerText == 0) {
    if(bs.innerText != 0) {
      bs.innerText--;
    } else if(bm.innerText != 0 && bs.innerText == 0){
      bs.innerText = 59;
      bm.innerText--;
    }
  }

  if(wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0){
    wm.innerText == 25;
    ws.innerText == "00";

    bm.innerText == 1;
    bs.innerText == "00";

    document.getElementById('counter-count').innerText++;
  }
}