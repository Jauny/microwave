document.onload = function() {
  var timer = 0;
  var power = 1;

  var running = false;

  var timerPressed = false;
  var timerRotation = 0;

  var powerPressed = false;
  var powerRotation = 0;

  var door  = document.getElementById("door");
  var timerEl = document.getElementById("timer");
  var powerEl = document.getElementById("power");
  var timerData = document.getElementById("data-timer");
  var powerData = document.getElementById("data-power");
  var start = document.getElementById("start");

  var mouseY;

  timerEl.onmousedown = function(e) {
    mouseY = e.clientY;
    timerPressed = true;
  }

  powerEl.onmousedown = function(e) {
    mouseY = e.clientY;
    powerPressed = true;
  }

  document.onmouseup = function(e) {
    timerPressed = false;
    powerPressed = false;
  }

  document.onmousemove = function(e) {
    if (timerPressed) {
      timerRotation += (e.clientY - mouseY) * 3;
      timerRotation = Math.min(Math.max(0, timerRotation), 360);
      timer = Math.ceil(timerRotation / 6);

      timerEl.style.transform = "rotate(" + timerRotation + "deg)";
      timerData.innerHTML = timer;
    }

    if (powerPressed) {
      powerRotation += (e.clientY - mouseY) * 3;
      powerRotation = Math.min(Math.max(0, powerRotation), 360);
      power = Math.ceil(powerRotation / 36) + 1;
      powerEl.style.transform = "rotate(" + powerRotation + "deg)";
      powerData.innerHTML = power;
    }

    mouseY = e.clientY;
  }

  start.onclick = function(e) {
    if (timerRotation > 0) {
      start.innerHTML = "Stop";
      door.style.backgroundColor = "Goldenrod";
      var interval = setInterval(function() {
        timerRotation -= 6;
        timer = Math.ceil(timerRotation / 6);
        if (timerRotation <= 0) {
          clearInterval(interval);
          door.style.backgroundColor = "grey";
          timer = 0;
          timerRotation = 0;
          start.innerHTML = "Start";
        }
        timerEl.style.transform = "rotate(" + Math.max(0, timerRotation) + "deg)";
        timerData.innerHTML = timer;
      }, 1000);
    }
  }
}();