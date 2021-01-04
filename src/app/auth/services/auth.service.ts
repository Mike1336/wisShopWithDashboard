import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { ITokens, ILoginFormData, userRole, IJWTPayload } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
},
)
export class AuthService {

  public now = new Date().getTime();

  public expTimeOfToken = 0;

  private _authUrl = '/auth/jwt/';

  private _userRole$ = new ReplaySubject<userRole>(1);

  private _login$ = new ReplaySubject<void>(1);

  private _checkingDataForLogin$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) { }

  public get checkingDataForLogin$() : Observable<boolean> {
    return this._checkingDataForLogin$.asObservable();
  }

  public get userRole$(): Observable<userRole> {
    return this._userRole$?.asObservable()
      .pipe(
        shareReplay(),
        );
  }

  public get login$(): Observable<void> {
    return this._login$.asObservable()
      .pipe(
        shareReplay(),
        );
  }

  public get token(): string | null {
    return sessionStorage.getItem('access-token');
  }

  public changeLoadingStatus(data: boolean): void {
    this._checkingDataForLogin$.next(data);
  }

  public login(user: ILoginFormData): void {
    this._http.post(
      `${this._authUrl}/create`, user)
      .subscribe({
        next: (response: ITokens | any) => {
          if (!response || !('access' in response) || !('refresh' in response)) {
            console.error('Invalid response: ', response);
          }
          console.log(response);

          this._setToken(response);
          this._login$.next();
        },
        error: (error) => {
          console.log(error)
          this._login$.error(error);
        },
      });
  }

  public logout(): void {
    sessionStorage.clear();
  }

  public isAuth(): boolean {
    return !!this.token;
  }

  private _setToken(response: ITokens): void {
    this.expTimeOfToken = +(new Date(this._getExpiresTime(response.access)).getTime());

    sessionStorage.setItem('access-token', response.access);
    sessionStorage.setItem('refresh-token', response.refresh);
    sessionStorage.setItem('token-exp', this.expTimeOfToken.toString());

    this._userRole$.next('admin');
  }

  private _getExpiresTime(token: string): number {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c: string) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload: IJWTPayload = JSON.parse(jsonPayload);

    return payload.exp;
  }

  private _getNewAccessToken(): void {
    const refresh = sessionStorage.getItem('refresh-token');

    this._http.post(`${this._authUrl}/refresh`, { refresh })
      .subscribe({
        next: (response: ITokens | any) => {
          this._setToken(response);
        },
        error: (error) => {
          console.error(error);
        },
      });

  }

}
