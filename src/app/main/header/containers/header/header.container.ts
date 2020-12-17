import { NavigationEnd, Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit, ChangeDetectorRef,
} from '@angular/core';

import { takeUntil, filter } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { AuthService } from '../../../../auth/services/auth.service';
import { NavbarService } from '../../../navbar/services/navbar.service';
import { CartService } from '../../../cart/services/cart.service';
import { Cart } from '../../../cart/classes/cart';
import { userRole } from '../../../../auth/interfaces/user';

import { Wishlist } from './../../../wishlist/classes/wishlist';
import { WishlistService } from './../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.container.html',
  styleUrls: ['./header.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderContainer implements OnInit, OnDestroy {

  public userRole!: userRole;

  public searchIsShow!: boolean;

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    private _auth: AuthService,
    private _navbarService: NavbarService,
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _router: Router,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public get cart(): Cart {
    return this._cartService.cart;
  }

  public get wishlist(): Wishlist {
    return this._wishlistService.wishlist;
  }

  public ngOnInit(): void {
    this._listenUrl();
    this._listenRole();
    this._listenCartChanges();
    this._listenWishlistChanges();
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

  private _listenCartChanges(): void {
    this.cart.change$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        () => {
          this._cdRef.markForCheck();
        },
      );
  }

  private _listenWishlistChanges(): void {
    this.wishlist.change$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        () => {
          this._cdRef.markForCheck();
        },
      );
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

  private _listenUrl(): void {
    this._router.events
      .pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this._destroy$),
      )
      .subscribe(
        (event: any) => {
          if (!event || !event.url) {
            console.error('Router navigation error');

            return;
          }

          if (event.url === '/cart' || event.url === '/wishlist') {
            this.searchIsShow = false;
            this._cdRef.markForCheck();

            return;
          }
          this.searchIsShow = true;
          this._cdRef.markForCheck();
        });
  }

}
