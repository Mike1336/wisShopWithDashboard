import { ChangeDetectionStrategy, Component, Inject, ChangeDetectorRef } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CartService } from '../../../main/cart/services/cart.service';
import { WishlistService } from '../../../main/wishlist/services/wishlist.service';
import { Wishlist } from '../../../main/wishlist/classes/wishlist';
import { Cart } from '../../../main/cart/classes/cart';

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
    private _snackBar: MatSnackBar,
    private _cdRef: ChangeDetectorRef,
  ) {}

  public get cart(): Cart {
    return this._cartService.cart;
  }

  public get wishlist(): Wishlist {
    return this._wistlistService.wishlist;
  }

  public checkInWishlist(item: IProductDataFormat): void {
    this.wishlist.updateList(item);

    if (this.wishlist.isExist(item)) {
      this._snackBar.open(`${item.name} was successfully added to your wishlist`, 'OK', {
        duration: 2000,
      });

      return;
    }
    this._snackBar.open(`${item.name} was successfully deleted from your wishlist`, 'OK', {
      duration: 2000,
    });

  }
  public checkInCart(item: IProductDataFormat): void {
    this.cart.updateList(item);

    if (this.cart.isExist(item)) {
      this._snackBar.open(`${item.name} was successfully added to your cart`, 'OK', {
        duration: 2000,
      });

      return;
    }
    this._snackBar.open(`${item.name} was successfully deleted from your cart`, 'OK', {
      duration: 2000,
    });
  }
  public checkWishlistExisting(item: IProductDataFormat): boolean {
    // для отображения иконки избранных товаров
    return this.wishlist.isExist(item);
  }
  public checkCartExisting(item: IProductDataFormat): boolean {
    // для отображения иконки избранных товаров
    return this.cart.isExist(item);
  }

}
