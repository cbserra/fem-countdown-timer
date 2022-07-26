import { CountdownTimer } from "./CountdownTimer";
import {
  TimeUnitKey,
  getUpdatedDistance,
  CountdownUnitElements,
  CountdownUnitValues,
  INIT_DELTA_VALUES,
  getCountdownElements,
  TWO_WEEKS_AHEAD,
} from "./util";

const INIT_UNIT_DELTA_VALUES: CountdownUnitValues = {
  [TimeUnitKey.days]: INIT_DELTA_VALUES,
  [TimeUnitKey.hours]: INIT_DELTA_VALUES,
  [TimeUnitKey.minutes]: INIT_DELTA_VALUES,
  [TimeUnitKey.seconds]: INIT_DELTA_VALUES,
};

// const INIT_HTML_ELEMENTS: CountdownElements = {
//   [CountdownElementKey.outerContainer]: null,
//   [CountdownElementKey.innerContainer]: null,
//   [CountdownElementKey.topElement]: null,
//   [CountdownElementKey.bottomElement]: null,
//   [CountdownElementKey.backElement]: null,
//   [CountdownElementKey.backBottomElement]: null,
// };

const INIT_UNIT_HTML_ELEMENTS: CountdownUnitElements = {
  [TimeUnitKey.days]: getCountdownElements(TimeUnitKey.days),
  [TimeUnitKey.hours]: getCountdownElements(TimeUnitKey.hours),
  [TimeUnitKey.minutes]: getCountdownElements(TimeUnitKey.minutes),
  [TimeUnitKey.seconds]: getCountdownElements(TimeUnitKey.seconds),
} as CountdownUnitElements;

const countdownTimer = new CountdownTimer(
  TWO_WEEKS_AHEAD,
  Date.now(),
  INIT_UNIT_HTML_ELEMENTS,
  INIT_UNIT_DELTA_VALUES
);
updateTimer();

// function updateTimer(requestTimestamp?: number): void {
function updateTimer(): void {
  console.count("updateTimer");
  // const timeCalled = requestTimestamp || Date.now();
  // const timeInterval = requestAnimationFrame(updateTimer);

  // const timeInterval = requestAnimationFrame(updateTimer);
  // const distance = getUpdatedDistance(countdownTimer.$targetDate);
  // if (distance < 0) {
  //   cancelAnimationFrame(timeInterval);
  //   return;
  // }

  setTimeout(() => countdownTimer.update(), 500);
  // countdownTimer.update();
}
