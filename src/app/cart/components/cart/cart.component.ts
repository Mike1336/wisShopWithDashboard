import { Component, OnDestroy, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from '../../services/cart.service';
import { DeleteConfirmingComponent } from '../delete-confirming/delete-confirming.component';

import { Wishlist } from './../../../wishlist/classes/wishlist';
import { WishlistService } from './../../../wishlist/services/wishlist.service';
import { IProductDataFormat, ICartItem } from './../../../core/interfaces/data-formats';
import { Cart } from './../../classes/cart';
import { ItemDetailsComponent } from './../../../layouts/item-details/components/item-details.component';


@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _snackBar: MatSnackBar,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public get cart(): Cart {
    return this._cartService.cart;
  }

  public get wishlist(): Wishlist {
    return this._wishlistService.wishlist;
  }

  public ngOnInit(): void {
    this._listenCartChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public checkQuantityOfItem(item: ICartItem): void {
    if (item.quantity > 0) {
      this.cart.calculateTotalPrice();

      return;
    }
    this.openDeleteConfirming(item);
  }

  public deleteItem(item: IProductDataFormat): void {
    this.cart.updateList(item);
    this._snackBar.open(`${name} was deleted from your cart`, 'OK', {
      duration: 2000,
    });
  }

  public checkInWishlist(item: IProductDataFormat): void {
    this.wishlist.updateList(item);

    if (this.wishlist.isExist(item)) {
      this._snackBar.open(`${item.name} was successfully deleted from your wislist`, 'OK', {
        duration: 2000,
      });

      return;
    }
    this._snackBar.open(`${item.name} was successfully added to your wishlist`, 'OK', {
      duration: 2000,
    });
  }

  public checkItemForFav(item: IProductDataFormat): boolean {
    // для отображения иконки товаров из корзины
    return this.wishlist.isExist(item);
  }

  public openDeleteConfirming(item: ICartItem): void {
    // отправление данных в компонент модалки после открытия
    const confirmModal = this.dialog.open(DeleteConfirmingComponent, {
      data: {
        id: item.id,
        name: item.name,
      },
    });
    confirmModal.afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe((result) => { // получение данных после закрытия
        if (!result) {
          item.quantity = 1;

          return;
        }
        this.deleteItem(item);
      });
  }

  public openItemDetails({ id, name, brand, price, mainImage, images }: IProductDataFormat): void {
    // отправление данных в компонент модалки после открытия
    this.dialog.open(ItemDetailsComponent, {
      data: {
        id,
        name,
        brand,
        price,
        mainImage,
        images,
      },
    });
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

}
