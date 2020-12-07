import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { AuthService } from '../../../../auth/services/auth.service';
import { NavbarService } from '../../../../shared/navbar/services/navbar.service';

import { CartService } from './../../../../cart/services/cart.service';
import { Cart } from './../../../../cart/classes/cart';
import { userRole } from './../../../../auth/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.container.html',
  styleUrls: ['./header.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderContainer implements OnInit, DoCheck, OnDestroy {

  public userRole!: userRole;

  public currentRoute!: string;

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    private _auth: AuthService,
    private _navbarService: NavbarService,
    private _cartService: CartService,
    private _router: Router,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public get cart(): Cart {
    return this._cartService.cart;
  }

  public ngOnInit(): void {
    this._listenRole();
  }
  public ngDoCheck(): void {
    this._listenRoute();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public logout(): void {
    this._auth.logout();
  }

  public changeNavbarStatus(): void {
    this._navbarService.changeStatus();
  }

  private _listenRole(): void {
    this._auth.userRole$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (role: userRole) => {
          this.userRole = role;
        },
      );
  }

  private _listenRoute(): void {
    this.currentRoute = this._router.url;
    this._cdRef.markForCheck();
  }

}
