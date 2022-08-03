// import "./style.css";

const COUNT_DOWN_INTERVAL = 500;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLIS_IN_SECOND = 1000;
const MILLIS_IN_DAY = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;
const MILLIS_IN_HOUR = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const MILLIS_IN_MINUTE = MILLIS_IN_SECOND * SECONDS_IN_MINUTE;

const daysEl = document.getElementById("days");
console.log(`🚀 ~ file: index.ts ~ line 15 ~ daysEl`, daysEl);
const daysBottomEl = daysEl?.parentElement?.querySelector(".time-unit__bottom");
console.log(`🚀 ~ file: index.ts ~ line 17 ~ daysBottomEl`, daysBottomEl);
const daysBackEl = daysEl?.parentElement?.querySelector(".time-unit__back");
console.log(`🚀 ~ file: index.ts ~ line 19 ~ daysBackEl`, daysBackEl);
const daysBackBottomEl = daysBackEl?.querySelector(".time-unit__bottom");
console.log(`🚀 ~ file: index.ts ~ line 21 ~ daysBackBottomEl`, daysBackBottomEl);

const hoursEl = document.getElementById("hours");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ hoursEl`, hoursEl);
const hoursBottomEl = hoursEl?.parentElement?.querySelector(".time-unit__bottom");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ hoursBottomEl`, hoursBottomEl);
const hoursBackEl = hoursEl?.parentElement?.querySelector(".time-unit__back");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ hoursBackEl`, hoursBackEl);
const hoursBackBottomEl = hoursBackEl?.querySelector(".time-unit__bottom");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ hoursBackBottomEl`, hoursBackBottomEl);

const minutesEl = document.getElementById("minutes");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ minutesEl`, minutesEl);
const minutesBottomEl = minutesEl?.parentElement?.querySelector(".time-unit__bottom");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ minutesBottomEl`, minutesBottomEl);
const minutesBackEl = minutesEl?.parentElement?.querySelector(".time-unit__back");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ minutesBackEl`, minutesBackEl);
const minutesBackBottomEl = minutesBackEl?.querySelector(".time-unit__bottom");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ minutesBackBottomEl`, minutesBackBottomEl);

const secondsEl = document.getElementById("seconds");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ secondsEl`, secondsEl);
const secondsBottomEl = secondsEl?.parentElement?.querySelector(".time-unit__bottom");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ secondsBottomEl`, secondsBottomEl);
const secondsBackEl = secondsEl?.parentElement?.querySelector(".time-unit__back");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ secondsBackEl`, secondsBackEl);
const secondsBackBottomEl = secondsBackEl?.querySelector(".time-unit__bottom");
console.log(`🚀 ~ file: index.ts ~ line 55 ~ secondsBackBottomEl`, secondsBackBottomEl);

const addDays = (date: Date, days: number) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const runCountdownTimer = () => {
  let prevDays = "0",
    prevHours = "0",
    prevMinutes = "0",
    prevSeconds = "0";
  let currentDays = "0",
    currentHours = "0",
    currentMinutes = "0",
    currentSeconds = "0";
  const twoWeeksAhead = addDays(new Date(), 14).getTime();
  setInterval(() => {
    // const distance = COUNT_DOWN_DATE - Date.now();
    const distance = twoWeeksAhead - Date.now();
    console.log(distance);
    currentDays = toStringAndPad(Math.floor(distance / MILLIS_IN_DAY));
    currentHours = toStringAndPad(Math.floor((distance % MILLIS_IN_DAY) / MILLIS_IN_HOUR));
    currentMinutes = toStringAndPad(Math.floor((distance % MILLIS_IN_HOUR) / MILLIS_IN_MINUTE));
    currentSeconds = toStringAndPad(Math.floor((distance % MILLIS_IN_MINUTE) / MILLIS_IN_SECOND));

    if (daysEl && prevDays !== currentDays) {
      //   daysEl.classList.add("time-unit__value--flipped");
      daysEl.innerHTML = prevDays;
      daysBottomEl?.setAttribute("data-value", currentDays);
      daysBackEl?.setAttribute("data-value", currentDays);
      daysBackBottomEl?.setAttribute("data-value", prevDays);
      prevDays = currentDays;
      removeClassAfterTimeout(daysEl, "time-unit__value--flipped", 500);
    }
    if (hoursEl && prevHours !== currentHours) {
      //   hoursEl.classList.add("time-unit__value--flipped");

      hoursEl.innerHTML = prevHours;
      hoursBottomEl?.setAttribute("data-value", currentHours);
      hoursBackEl?.setAttribute("data-value", currentHours);
      hoursBackBottomEl?.setAttribute("data-value", prevHours);
      prevHours = currentHours;
      removeClassAfterTimeout(hoursEl, "time-unit__value--flipped", 500);
    }
    if (minutesEl && prevMinutes !== currentMinutes) {
      //   minutesEl.classList.add("time-unit__value--flipped");
      minutesEl.setAttribute("data-value", currentMinutes);
      minutesEl.innerHTML = currentMinutes;
      prevMinutes = currentMinutes;
      removeClassAfterTimeout(minutesEl, "time-unit__value--flipped", 500);
    }
    if (secondsEl && prevSeconds !== currentSeconds) {
      //   secondsEl.classList.add("time-unit__value--flipped");
      secondsEl.innerHTML = prevSeconds;
      secondsBackEl?.setAttribute("data-value", currentSeconds);
      secondsBottomEl?.setAttribute("data-value", currentSeconds);
      secondsBackBottomEl?.setAttribute("data-value", prevSeconds);

      prevSeconds = currentSeconds;
      removeClassAfterTimeout(secondsEl, "time-unit__value--flipped", 500);
    }
  }, COUNT_DOWN_INTERVAL);
};

const toStringAndPad = (num: number) => {
  return num.toString().padStart(2, "0");
};

const removeClassAfterTimeout = (_el: HTMLElement, _className: string, _timeout: number) => {
  //   setTimeout(() => {
  //     el.classList.remove(className);
  //   }, timeout);
};

runCountdownTimer();

export {};
