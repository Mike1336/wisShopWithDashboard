import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable()
export class SearchService {

  private _query$ = new Subject<string>();

  private _reset$ = new Subject<void>();

  constructor() { }

  public get query$(): Observable<string> {
    return this._query$.asObservable();
  }

  public get reset$(): Observable<void> {
    return this._reset$.asObservable();
  }

  public setQuery(value: string): void {
    this._query$.next(value);
  }

  public resetQuery(): void {
    this._query$.next('');
    this._reset$.next();
  }

}
