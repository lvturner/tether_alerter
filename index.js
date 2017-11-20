const say = require('say');
const request = require('request');
const interval = 60000; // 1 minute
let lastTx = "";
let firstRun = true; // laaazy

function checkTx() {
  let requestOptions = {
    url: 'http://omniexplorer.info/ask.aspx',
    qs: {
      api: 'gethistory',
      address: '3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL'
    }
  };

  request(requestOptions,
    (error, response, body) => {
      console.log(body);
      let parsedBody = JSON.parse(body);
      if(parsedBody.transactions[0] !== lastTx) {
        sayAlert();
        lastTx = parsedBody.transactions[0];
      }
    }
  );
}

function sayAlert() {
  if(firstRun) {
    say.speak("Tether alerter initialized");
    firstRun = false;
  } else {
    say.speak("Warning! New Tethers have been created!");
  }
}

checkTx();

setInterval(checkTx,interval);
