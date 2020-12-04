import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IFbResponse } from '../interfaces/fb-response';
import { IUser, userRole } from '../interfaces/user';

import { IResponseFormat } from './../../layouts/table/interfaces/response-format';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _userRole$ = new ReplaySubject<userRole>(1);

  private _checkingDataForLogin$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) { }

  public get checkingDataForLogin$() : Observable<boolean> {
    return this._checkingDataForLogin$.asObservable();
  }

  public get userRole$(): Observable<userRole> {
    return this._userRole$.asObservable()
      .pipe(
        shareReplay(),
        );
  }

  public changeLoadingStatus(data: boolean): void {
    this._checkingDataForLogin$.next(data);
  }

  public get token(): string | null {
    if (!sessionStorage.getItem('fb-token-exp')) {
      return null;
    }
    const now = +(new Date().getTime);
    const expDate = +(new Date(sessionStorage.getItem('fb-token-exp') ?? '').getTime);

    if (now > expDate) {
      this.logout();

      return null;
    }

    return sessionStorage.getItem('fb-token');
  }

  public login(user: IUser): Observable<IResponseFormat | unknown> {
    user.returnSecureToken = true;

    return this._http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        environment.apiKey
      }`, user)
      .pipe(
        tap(this._setToken),
      );
  }

  public logout(): void {
    this._setToken(null);
    this._userRole$.next('guest');
  }

  public isAuth(): boolean {
    return !!this.token;
  }

  private _setToken(response: IFbResponse | any): void {
    if (!response || !('idToken' in response)) {
      sessionStorage.clear();

      return;
    }

    const now = new Date().getTime();
    const expDate = new Date(now + (+response.expiresIn * 1000));

    sessionStorage.setItem('fb-token', response.idToken);
    sessionStorage.setItem('fb-token-exp', expDate.toString());

    this._userRole$.next('admin');
  }

}
