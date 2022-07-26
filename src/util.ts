// const COUNT_DOWN_INTERVAL = 1000;

export type CountdownElements = {
  [key in CountdownElementKey]: NullableHTMLElement;
};

export type CountdownUnitElements = {
  [key in TimeUnitKey]: CountdownElements;
};

export type DeltaValues = { previousValue: string; currentValue: string };

export interface CountdownUnitValues {
  days: DeltaValues;
  hours: DeltaValues;
  minutes: DeltaValues;
  seconds: DeltaValues;
}

export enum TimeUnitKey {
  days = "days",
  hours = "hours",
  minutes = "minutes",
  seconds = "seconds",
}
export enum CountdownElementKey {
  outerContainer = "outerContainer",
  innerContainer = "innerContainer",
  topElement = "topElement",
  bottomElement = "bottomElement",
  backElement = "backElement",
  backBottomElement = "backBottomElement",
}

export type NullableHTMLElement = HTMLElement | null;
// = "topElement" | "bottomElement" | "backElement" | "backBottomElement" | "outerContainer" | "innerContainer";
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLIS_IN_SECOND = 1000;
const MILLIS_IN_DAY =
  MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;
const MILLIS_IN_HOUR = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const MILLIS_IN_MINUTE = MILLIS_IN_SECOND * SECONDS_IN_MINUTE;

export const INIT_DELTA_VALUES: DeltaValues = {
  previousValue: "",
  currentValue: "00",
};

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const TWO_WEEKS_AHEAD = addDays(new Date(), 14).getTime();

export function setAttribute(
  element: NullableHTMLElement,
  key: string,
  value: string
): void {
  if (!element) return;

  element.setAttribute(key, value);
}

export function getUpdatedDistance(
  targetDate: number,
  currentDate = Date.now()
): number {
  return targetDate - currentDate;
}

export const toStringAndPad = (num: number) => {
  return num.toString().padStart(2, "0");
};

export function toDaysFormatted(distance: number): string {
  return toStringAndPad(Math.floor(distance / MILLIS_IN_DAY));
}

export function toHoursFormatted(distance: number): string {
  return toStringAndPad(
    Math.floor((distance % MILLIS_IN_DAY) / MILLIS_IN_HOUR)
  );
}
export function toMinutesFormatted(distance: number): string {
  return toStringAndPad(
    Math.floor((distance % MILLIS_IN_HOUR) / MILLIS_IN_MINUTE)
  );
}
export function toSecondsFormatted(distance: number): string {
  return toStringAndPad(
    Math.floor((distance % MILLIS_IN_MINUTE) / MILLIS_IN_SECOND)
  );
}

export const getCountdownElements = (unit: string): CountdownElements => {
  const topEl = document.getElementById(unit);
  const innerContainer = topEl?.parentElement;
  const outerContainer = innerContainer?.parentElement;
  const bottomEl = innerContainer?.querySelector(".card__bottom");
  const backEl = innerContainer?.querySelector(".card__back");
  const backBottomEl = backEl?.querySelector(".card__bottom");

  const elements = {
    outerContainer: outerContainer,
    innerContainer: innerContainer,
    topElement: topEl,
    bottomElement: bottomEl,
    backElement: backEl,
    backBottomElement: backBottomEl,
  } as CountdownElements;

  return elements;
};
