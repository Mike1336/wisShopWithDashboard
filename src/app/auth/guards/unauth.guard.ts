import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class UnauthGuard implements CanActivate {

  constructor(
        private _auth: AuthService,
        private _router: Router,
    ) {}

  public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) : Observable<boolean> | UrlTree | boolean {
    if (!this._auth.isAuth()) {
      return true;
    }

    return this._router.createUrlTree(['/admin/dashboard']);
  }

}
