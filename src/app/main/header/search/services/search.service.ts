import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable()
export class SearchService {

  private _isEnable = false;

  private _query$ = new Subject<string>();

  private _reset$ = new Subject<void>();

  constructor() { }

  public get isEnable(): boolean {
    return this._isEnable;
  }

  public get query$(): Observable<string> {
    return this._query$.asObservable();
  }

  public get reset$(): Observable<void> {
    return this._reset$.asObservable();
  }

  public setQuery(value: string): void {
    if (!value) {
      this._isEnable = false;
      this._query$.next(value);

      return;
    }
    this._isEnable = true;
    this._query$.next(value);
  }

  public resetQuery(): void {
    this._isEnable = false;
    this._query$.next('');
    this._reset$.next();
  }

}
