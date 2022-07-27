// import "./style.css";
const addDays = (date, days) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const TWO_WEEKS_AHEAD = addDays(new Date(), 14).getTime();

const COUNT_DOWN_DATE = TWO_WEEKS_AHEAD; //new Date("Jan 1, 2023 00:00:00").getTime();
const COUNT_DOWN_INTERVAL = 1000;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLIS_IN_SECOND = 1000;
const MILLIS_IN_DAY =
  MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;
const MILLIS_IN_HOUR = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const MILLIS_IN_MINUTE = MILLIS_IN_SECOND * SECONDS_IN_MINUTE;
const simpleTimer = document.querySelector(".simple-timer");
// const daysEl = simpleTimer.getElementById("days");
// const hoursEl = simpleTimer.getElementById("hours");
// const minutesEl = simpleTimer.getElementById("minutes");
// const secondsEl = simpleTimer.getElementById("seconds");
const daysEl = simpleTimer.querySelector("#days");
const hoursEl = simpleTimer.querySelector("#hours");
const minutesEl = simpleTimer.querySelector("#minutes");
const secondsEl = simpleTimer.querySelector("#seconds");
const runCountdownTimer = function () {
  setInterval(function () {
    // const now = new Date().getTime();
    var distance = COUNT_DOWN_DATE - Date.now();
    var days = Math.floor(distance / MILLIS_IN_DAY).toString();
    var hours = Math.floor(
      (distance % MILLIS_IN_DAY) / MILLIS_IN_HOUR
    ).toString();
    var minutes = Math.floor(
      (distance % MILLIS_IN_HOUR) / MILLIS_IN_MINUTE
    ).toString();
    var seconds = Math.floor(
      (distance % MILLIS_IN_MINUTE) / MILLIS_IN_SECOND
    ).toString();
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
