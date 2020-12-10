import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {

  private _isShown = false;

  private _status$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  public get status$(): Observable<boolean> {
    return this._status$.asObservable();
  }

  public setStatus(value: boolean): void {
    this._isShown = value;
    this._status$.next(this._isShown);
  }

  public changeStatus(): void {
    this._isShown = !this._isShown;
    this._status$.next(this._isShown);
  }

}
