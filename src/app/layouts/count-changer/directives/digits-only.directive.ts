import { Directive, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[digitsOnly]',
})
export class DigitsOnlyDirective implements OnInit, OnDestroy{

  private _destroy$ = new Subject<void>();

  constructor(private _control: NgControl) { }

  public ngOnInit(): void {
    this._initControl();
  }

  public ngOnDestroy() : void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initControl(): void {
    const control = this._control.control;

    if (!control) {
      console.error('Control is not exists');
    }
    if (!(control?.touched)) {
      return;
    }
    control?.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (data) => {
          if (!data) {
            console.error('Control data is not exists');

            return;
          }
          control.setValue(`${data}`.replace(/\D/g, ''), { emitEvent: false });
        },
      );

  }

}
