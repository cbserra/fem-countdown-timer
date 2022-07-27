// import { CountdownTimer } from "./CountdownTimer";
import {
  TimeUnitKey,
  getUpdatedDistance,
  CountdownUnitElements,
  CountdownUnitValues,
  INIT_DELTA_VALUES,
  getCountdownElements,
  TWO_WEEKS_AHEAD,
  toDaysFormatted,
  toHoursFormatted,
  toMinutesFormatted,
  toSecondsFormatted,
  DeltaValues,
  setAttribute,
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

// const countdownTimer = new CountdownTimer(
//   TWO_WEEKS_AHEAD,
//   Date.now(),
//   INIT_UNIT_HTML_ELEMENTS,
//   INIT_UNIT_DELTA_VALUES
// );
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

  setTimeout(() => update(), 500);
  // countdownTimer.update();
}

const DATA_VAL_ATTR = "data-value";

const TOGGLE_ANIMATION_CLASS = "flip";

// export class CountdownTimer {
const targetDate: number = TWO_WEEKS_AHEAD;
const currentDate: number = Date.now();
//   private distance: number;
const unitElements: CountdownUnitElements = INIT_UNIT_HTML_ELEMENTS;
const unitValues: CountdownUnitValues = INIT_UNIT_DELTA_VALUES;

// constructor(
//   targetDate: number,
//   currentDate: number,
//   unitElements: CountdownUnitElements,
//   unitValues: CountdownUnitValues
// ) {
//   targetDate = targetDate;
//   currentDate = currentDate || Date.now();
//   // distance = getUpdatedDistance(targetDate);
//   unitElements = unitElements;
//   unitValues = unitValues;

//   _init();
// }

//   public update(distance?: number): void {
function update(): void {
  // console.count("update");
  const timeInterval = requestAnimationFrame(() => update());

  // distance = distance ?? getUpdatedDistance(targetDate);
  const distance = getUpdatedDistance(targetDate);

  if (distance <= 0) {
    cancelAnimationFrame(timeInterval);
    return;
  }

  _updateTimeUnits(unitValues, distance);

  _updateCountdownUi(unitElements, unitValues);
}

function _updateTimeUnits(unitValues: CountdownUnitValues, distance: number) {
  // distance = distance ?? getUpdatedDistance(targetDate);
  unitValues.days = _getUpdatedCountdownValues(
    unitValues.days,
    toDaysFormatted(distance)
  );
  unitValues.hours = _getUpdatedCountdownValues(
    unitValues.hours,
    toHoursFormatted(distance)
  );
  unitValues.minutes = _getUpdatedCountdownValues(
    unitValues.minutes,
    toMinutesFormatted(distance)
  );
  unitValues.seconds = _getUpdatedCountdownValues(
    unitValues.seconds,
    toSecondsFormatted(distance)
  );
}

// private _updateCountdownUi(): void {
//   Object.keys(unitElements).forEach((unit) => {
//     const elements = unitElements[unit as keyof CountdownUnitElements];
//     const values = unitValues[unit as keyof CountdownUnitValues];
//     if (elements.topElement && values.currentValue !== values.previousValue) {
//       elements.topElement.innerText = values.previousValue;
//       setAttribute(
//         elements.bottomElement,
//         DATA_VAL_ATTR,
//         values.currentValue
//       );
//       setAttribute(elements.backElement, DATA_VAL_ATTR, values.currentValue);
//       setAttribute(
//         elements.backBottomElement,
//         DATA_VAL_ATTR,
//         values.previousValue
//       );

//       _toggleAnimationClass(elements.outerContainer as HTMLElement);

//       // setTimeout(update, 1_000);
//       // setTimeout(() => update(), 500);
//       // prevDays = currentDays;
//     }
//   });
// }
// private _toggleAnimationClass(outerContainer: HTMLElement): void {
//   outerContainer.classList.remove(TOGGLE_ANIMATION_CLASS);
//   // Updates 'offsetWidth' to force a reflow
//   void outerContainer.offsetWidth;
//   outerContainer.classList.add(TOGGLE_ANIMATION_CLASS);
// }

// private _getUpdatedCountdownValues(
//   deltaValues: DeltaValues,
//   formattedValue: string
// ): DeltaValues {
//   const updatedDeltas = {
//     previousValue: deltaValues.currentValue,
//     currentValue: formattedValue,
//   };
//   return updatedDeltas;
// }
// }

function _updateCountdownUi(
  unitElements: CountdownUnitElements,
  unitValues: CountdownUnitValues
): void {
  Object.keys(unitElements).forEach((unit) => {
    const elements = unitElements[unit as keyof CountdownUnitElements];
    const values = unitValues[unit as keyof CountdownUnitValues];
    if (elements.topElement && values.currentValue !== values.previousValue) {
      elements.topElement.innerText = values.previousValue;
      setAttribute(elements.bottomElement, DATA_VAL_ATTR, values.currentValue);
      setAttribute(elements.backElement, DATA_VAL_ATTR, values.currentValue);
      setAttribute(
        elements.backBottomElement,
        DATA_VAL_ATTR,
        values.previousValue
      );

      _toggleAnimationClass(elements.outerContainer as HTMLElement);

      // setTimeout(update, 1_000);
      // setTimeout(() => update(), 500);
      // prevDays = currentDays;
    }
  });
}

function _toggleAnimationClass(outerContainer: HTMLElement): void {
  outerContainer.classList.remove(TOGGLE_ANIMATION_CLASS);
  // Updates 'offsetWidth' to force a reflow
  void outerContainer.offsetWidth;
  outerContainer.classList.add(TOGGLE_ANIMATION_CLASS);
}

function _getUpdatedCountdownValues(
  deltaValues: DeltaValues,
  formattedValue: string
): DeltaValues {
  const updatedDeltas = {
    previousValue: deltaValues.currentValue,
    currentValue: formattedValue,
  };
  return updatedDeltas;
}
