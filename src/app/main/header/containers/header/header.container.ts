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
import { CartService } from '../../../../core/services/cart.service';
import { userRole } from '../../../../auth/interfaces/auth';
import { WishlistService } from '../../../../core/services/wishlist.service';

import { ICartResponseFormat, IProductResponseFormat } from './../../../../core/interfaces/data-formats';

@Component({
  selector: 'app-header',
  templateUrl: './header.container.html',
  styleUrls: ['./header.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderContainer implements OnInit, OnDestroy {

  public userRole!: userRole;

  public searchIsShow!: boolean;

  public cartLength = 0;
  public wishlistLength = 0;

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    private _auth: AuthService,
    private _navbarService: NavbarService,
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _router: Router,
    private _cdRef: ChangeDetectorRef,
    ) { }

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
    this._cartService.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        ({ items }: ICartResponseFormat) => {
          this.cartLength = items.length;
          this._cdRef.markForCheck();
        },
      );
  }

  private _listenWishlistChanges(): void {
    this._wishlistService.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        ({ data: data }: IProductResponseFormat) => {
          this.wishlistLength = data.length;
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
