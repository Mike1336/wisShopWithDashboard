import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {

  private _isShown = false;

  private _status$ = new BehaviorSubject<boolean>(this._isShown);

  constructor() { }

  public get status$(): Observable<boolean> {
    return this._status$.asObservable();
  }

  public changeStatus(value?: boolean): void {
    if (value) {
      this._status$.next(value);

      return;
    }

    this._isShown = !this._isShown;
    this._status$.next(this._isShown);
  }

}
