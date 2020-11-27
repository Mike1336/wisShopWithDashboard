import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
        private _auth: AuthService,
        private _router: Router,
    ) {}

  public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) : Observable<boolean> | Promise<boolean> | boolean {
    console.log(this._auth.isAuth());

    if (!this._auth.isAuth()) {
      return true;
    }
    this._router.navigate(['/admin/dashboard']);

    return false;
  }

}
