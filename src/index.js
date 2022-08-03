// import "./style.css";
var COUNT_DOWN_DATE = new Date("Jan 1, 2023 00:00:00").getTime();
var COUNT_DOWN_INTERVAL = 1000;
var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var SECONDS_IN_MINUTE = 60;
var MILLIS_IN_SECOND = 1000;
var MILLIS_IN_DAY = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;
var MILLIS_IN_HOUR = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
var MILLIS_IN_MINUTE = MILLIS_IN_SECOND * SECONDS_IN_MINUTE;
var daysEl = document.getElementById("days");
var hoursEl = document.getElementById("hours");
var minutesEl = document.getElementById("minutes");
var secondsEl = document.getElementById("seconds");
var runCountdownTimer = function () {
  setInterval(function () {
    // const now = new Date().getTime();
    var distance = COUNT_DOWN_DATE - COUNT_DOWN_DATE;
    var days = Math.floor(distance / MILLIS_IN_DAY).toString();
    var hours = Math.floor((distance % MILLIS_IN_DAY) / MILLIS_IN_HOUR).toString();
    var minutes = Math.floor((distance % MILLIS_IN_HOUR) / MILLIS_IN_MINUTE).toString();
    var seconds = Math.floor((distance % MILLIS_IN_MINUTE) / MILLIS_IN_SECOND).toString();
    if (daysEl) {
      daysEl.innerHTML = days;
    }
    if (hoursEl) {
      hoursEl.innerHTML = hours;
    }
    if (minutesEl) {
      minutesEl.innerHTML = minutes;
    }
    if (secondsEl) {
      secondsEl.innerHTML = seconds;
    }
  }, COUNT_DOWN_INTERVAL);
};
runCountdownTimer();
