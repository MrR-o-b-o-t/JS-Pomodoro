const start = document.getElementById('start');
const reset = document.getElementById('reset');
const stop = document.getElementById('stop');
const clearCount = document.getElementById('clear-count');
const focusInputField = document.getElementById('focus-input');
const breakInputField = document.getElementById('focus-break');
const wm = document.getElementById('w-minutes');
const ws = document.getElementById('w-seconds');
const bm = document.getElementById('b-minutes');
const bs = document.getElementById('b-seconds');
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

// Decrement seconds and minutes after timer starts
function timer() {
  if(ws.innerText != 0) {
    ws.innerText--;
       // add leading zero to break seconds
       if (ws.innerText <10) {
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
        if (bs.innerText <10){
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
      countDisplayCheck();
      timerEndAlert();
    }
  }
 }

 function countDisplayCheck() {
  counter = localStorage.getItem('count');
  counterNode = document.querySelector('#counter-node');
  counter++;
  localStorage.setItem('count', counter);
  counterNode.innerText = localStorage.getItem('count');
}

  // Update completed cycle counter from broswer storage on page load
    window.onload = function countDisplayUpdate() {
      let storedCount = localStorage.getItem('count');
      if(storedCount === null) {
        storedCount = 0;
      }
      let pElement = document.createElement('p');
      pElement.setAttribute('id', "counter-node");
      let pElementText = document.createTextNode(storedCount);
      pElement.appendChild(pElementText);
      let parent = document.querySelector('#counter-header');
      parent.appendChild(pElement);
}

  // Clear counter on button click
  clearCount.addEventListener('click', function(){
    localStorage.setItem('count', 0);
    counterNode = document.querySelector('#counter-node');
    counterNode.innerText = localStorage.getItem('count');
  })

  // Quoteoftheday API for completed timer alert quote
  const quote = document.getElementById("quoteBody");
  const cite = document.getElementById("quoteCite");
  async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random?tags=inspiration|inspirational|inspire");
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      quote.innerText = data.content;
      cite.innerText = ` -${data.author} `;
    } else {
      quote.textContent = "An error occured";
    }
  }
  
  // Play end timer audio and display modal
  function timerEndAlert() {
    const audioSound = document.getElementById("myAudio");
    audioSound.play();
    $('#myModal').modal();
    updateQuote()
  }

  var oktaSignIn = new OktaSignIn({
    baseUrl: "https://dev-70746537.okta.com",
    clientId: "0oabhudxi6ZwiOiOu5d6",
    signOutLink: 'https://www.signmeout.com',
    authParams: {
      issuer: "https://dev-70746537.okta.com/oauth2/default",
      responseType: ['token', 'id_token'],
      display: 'page'
    }
  });

  if (oktaSignIn.token.hasTokensInUrl()) {
    oktaSignIn.token.parseTokensFromUrl(
      // If we get here, the user just logged in.
      function success(res) {
        var accessToken = res[0];
        var idToken = res[1];

        oktaSignIn.tokenManager.add('accessToken', accessToken);
        oktaSignIn.tokenManager.add('idToken', idToken);

        window.location.hash='';
        document.getElementById("messageBox").innerHTML = "Hello, " + idToken.claims.email + "! You just logged in!";
      },
      function error(err) {
        console.error(err);
      }
    );
  } else {
    oktaSignIn.session.get(function (res) {
      // If we get here, the user is already signed in.
      if (res.status === 'ACTIVE') {
        document.getElementById("messageBox").innerHTML = "Hello, " + res.login + "! You are logged in!";
        return;
      }
    });
  }
          
  // var oktaSignIn = new OktaSignIn({
  //   baseUrl: "https://dev-70746537.okta.com",
  //   clientId: "0oabhudxi6ZwiOiOu5d6",
  //   authParams: {
  //     issuer: "https://dev-70746537.okta.com/oauth2/default",
  //     responseType: ['token', 'id_token'],
  //     display: 'page'
  //   }
  // });

  // if (oktaSignIn.token.hasTokensInUrl()) {
  //   oktaSignIn.token.parseTokensFromUrl(
  //     // If we get here, the user just logged in.
  //     function success(res) {
  //       var accessToken = res[0];
  //       var idToken = res[1];

  //       oktaSignIn.tokenManager.add('accessToken', accessToken);
  //       oktaSignIn.tokenManager.add('idToken', idToken);

  //       window.location.hash='';
  //       document.getElementById("messageBox").innerHTML = "Hello, " + idToken.claims.email + "! You just logged in!";
  //     },
  //     function error(err) {
  //       console.error(err);
  //     }
  //   );
  // } else {
  //   oktaSignIn.session.get(function (res) {
  //     // If we get here, the user is already signed in.
  //     if (res.status === 'ACTIVE') {
  //       document.getElementById("messageBox").innerHTML = "Hello, " + res.login + "! You are logged in!";
  //       return;
  //     }
  //     oktaSignIn.renderEl(
  //       { el: '#okta-login-container' },
  //       function success(res) {},
  //       function error(err) {
  //         console.error(err);
  //       }
  //     );
  //   });
  // }
