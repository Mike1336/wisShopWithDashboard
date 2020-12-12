import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../auth/services/auth.service';
import { NavbarService } from '../../../navbar/services/navbar.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.container.html',
  styleUrls: ['./header.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderContainer implements OnInit {

  constructor(
    private _auth: AuthService,
    private _navbarService: NavbarService,
    private _router: Router,
    ) { }

  public get expTimeOfToken(): number {
    return this._auth.expTimeOfToken;
  }

  public ngOnInit(): void {
    this._checkLoginStatus();
  }

  public logout(): void {
    this._auth.logout();
    this._router.navigate(['/login']);
  }

  public changeNavbarStatus(): void {
    this._navbarService.changeStatus();
  }

  private _checkLoginStatus(): void {
    if (!this._auth.isAuth()) {
      this._router.navigate(['/login']);
    }
  }

}
