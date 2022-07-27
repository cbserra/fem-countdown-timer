import {
  CountdownUnitElements,
  CountdownUnitValues,
  toDaysFormatted,
  toHoursFormatted,
  toMinutesFormatted,
  toSecondsFormatted,
  DeltaValues,
  setAttribute,
  getUpdatedDistance,
} from "./util";

const DATA_VAL_ATTR = "data-value";

const TOGGLE_ANIMATION_CLASS = "flip";

export class CountdownTimer {
  private readonly targetDate: number;
  private currentDate: number;
  //   private distance: number;
  private unitElements: CountdownUnitElements;
  private unitValues: CountdownUnitValues;

  constructor(
    targetDate: number,
    currentDate: number,
    unitElements: CountdownUnitElements,
    unitValues: CountdownUnitValues
  ) {
    this.targetDate = targetDate;
    this.currentDate = currentDate || Date.now();
    // this.distance = getUpdatedDistance(this.targetDate);
    this.unitElements = unitElements;
    this.unitValues = unitValues;

    this._init();
  }

  /**
   * Getter $targetDate
   * @return {number}
   */
  public get $targetDate(): number {
    return this.targetDate;
  }

  /**
   * Getter $currentDate
   * @return {number}
   */
  public get $currentDate(): number {
    return this.currentDate;
  }

  /**
   * Setter $currentDate
   * @param {number} value
   */
  public set $currentDate(value: number) {
    this.currentDate = value;
  }

  //   /**
  //    * Setter $distance
  //    * @param {number} value
  //    */
  //   public set $distance(value: number) {
  //     this.distance = value;
  //   }

  //   /**
  //    * Getter $distance
  //    * @return {number}
  //    */
  //   public get $distance(): number {
  //     return this.distance;
  //   }

  //   public update(distance?: number): void {
  public update(): void {
    console.count("this.update");
    const timeInterval = requestAnimationFrame(() => this.update());

    // this.distance = distance ?? getUpdatedDistance(this.targetDate);
    const distance = getUpdatedDistance(this.targetDate);

    if (distance <= 0) {
      cancelAnimationFrame(timeInterval);
      return;
    }

    this._updateTimeUnits(distance);

    this._updateCountdownUi();
  }

  private _init(): void {
    this.update();
  }

  private _updateTimeUnits(distance: number) {
    // this.distance = distance ?? getUpdatedDistance(this.targetDate);
    this.unitValues.days = this._getUpdatedCountdownValues(
      this.unitValues.days,
      toDaysFormatted(distance)
    );
    this.unitValues.hours = this._getUpdatedCountdownValues(
      this.unitValues.hours,
      toHoursFormatted(distance)
    );
    this.unitValues.minutes = this._getUpdatedCountdownValues(
      this.unitValues.minutes,
      toMinutesFormatted(distance)
    );
    this.unitValues.seconds = this._getUpdatedCountdownValues(
      this.unitValues.seconds,
      toSecondsFormatted(distance)
    );
  }

  private _updateCountdownUi(): void {
    Object.keys(this.unitElements).forEach((unit) => {
      const elements = this.unitElements[unit as keyof CountdownUnitElements];
      const values = this.unitValues[unit as keyof CountdownUnitValues];
      if (elements.topElement && values.currentValue !== values.previousValue) {
        elements.topElement.innerText = values.previousValue;
        setAttribute(
          elements.bottomElement,
          DATA_VAL_ATTR,
          values.currentValue
        );
        setAttribute(elements.backElement, DATA_VAL_ATTR, values.currentValue);
        setAttribute(
          elements.backBottomElement,
          DATA_VAL_ATTR,
          values.previousValue
        );

        this._toggleAnimationClass(elements.outerContainer as HTMLElement);

        // setTimeout(this.update, 1_000);
        // setTimeout(() => this.update(), 500);
        // prevDays = currentDays;
      }
    });
  }
  private _toggleAnimationClass(outerContainer: HTMLElement): void {
    outerContainer.classList.remove(TOGGLE_ANIMATION_CLASS);
    // Updates 'offsetWidth' to force a reflow
    void outerContainer.offsetWidth;
    outerContainer.classList.add(TOGGLE_ANIMATION_CLASS);
  }

  private _getUpdatedCountdownValues(
    deltaValues: DeltaValues,
    formattedValue: string
  ): DeltaValues {
    const updatedDeltas = {
      previousValue: deltaValues.currentValue,
      currentValue: formattedValue,
    };
    return updatedDeltas;
  }
}
