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

const INIT_UNIT_HTML_ELEMENTS: CountdownUnitElements = {
  [TimeUnitKey.days]: getCountdownElements(TimeUnitKey.days),
  [TimeUnitKey.hours]: getCountdownElements(TimeUnitKey.hours),
  [TimeUnitKey.minutes]: getCountdownElements(TimeUnitKey.minutes),
  [TimeUnitKey.seconds]: getCountdownElements(TimeUnitKey.seconds),
} as CountdownUnitElements;

updateTimer();

function updateTimer(): void {
  console.count("updateTimer");

  setTimeout(() => update(), 500);
}

const DATA_VAL_ATTR = "data-value";

const TOGGLE_ANIMATION_CLASS = "flip";

// export class CountdownTimer {
const targetDate: number = TWO_WEEKS_AHEAD;
const currentDate: number = Date.now();
const unitElements: CountdownUnitElements = INIT_UNIT_HTML_ELEMENTS;
const unitValues: CountdownUnitValues = INIT_UNIT_DELTA_VALUES;

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

function _updateCountdownUi(
  unitElements: CountdownUnitElements,
  unitValues: CountdownUnitValues
): void {
  Object.keys(unitElements).forEach((unit) => {
    const elements = unitElements[unit as keyof CountdownUnitElements];
    const values = unitValues[unit as keyof CountdownUnitValues];
    if (elements.topElement && values.currentValue !== values.previousValue) {
      elements.topElement.innerText = values.currentValue;
      setAttribute(elements.bottomElement, DATA_VAL_ATTR, values.previousValue);
      setAttribute(elements.backElement, DATA_VAL_ATTR, values.previousValue);
      setAttribute(
        elements.backBottomElement,
        DATA_VAL_ATTR,
        values.currentValue
      );

      _toggleAnimationClass(elements.outerContainer as HTMLElement);
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
