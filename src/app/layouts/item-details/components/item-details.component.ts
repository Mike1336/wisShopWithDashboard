import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

import { IProductDataFormat } from './../../../core/interfaces/data-formats';

@Component({
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public item: IProductDataFormat,
    private _wistlistService: WishlistService,
    private _cartService: CartService,
  ) {}

  public get cart(): CartService {
    return this._cartService;
  }

  public get wishlist(): WishlistService {
    return this._wistlistService;
  }

  public get loading$(): Observable<boolean> {
    return this.cart.loadingStatus$;
  }

  public addToCart(): void {
    this.cart.add(this.item);
  }

  public deleteFromCart(): void {
    this.cart.delete(this.item);
  }

  public addToWishlist(): void {
    this.wishlist.add(this.item);
  }

  public deleteFromWishlist(): void {
    this.wishlist.delete(this.item);
  }

}
