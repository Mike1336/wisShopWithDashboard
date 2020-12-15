import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'count-changer',
  templateUrl: './count-changer.component.html',
  styleUrls: ['./count-changer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CountChangerComponent),
    multi: true,
  }],
})
export class CountChangerComponent implements ControlValueAccessor {

  public value = 1;
  public disabled = true;

  constructor(private _cdRef: ChangeDetectorRef) {
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public writeValue(outsideValue: number): void {
    this.value = outsideValue;
    this._cdRef.markForCheck();
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public updateValue(insideValue: number): void {
    if (insideValue === 0) {
      this.onChange(insideValue);
      this.onTouched();

      return;
    }

    this.value = insideValue;
    this._cdRef.markForCheck();
    this.onChange(this.value);
    this.onTouched();
  }

  private onChange = (value: any) => {};
  private onTouched = () => {};

}
