import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ItemDetailsComponent } from '../../../../layouts/item-details/components/item-details.component';
import { DeleteConfirmingComponent } from '../../components/delete-confirming/delete-confirming.component';

import { ICartItemFormat, ICartResponseFormat } from './../../../../core/interfaces/data-formats';
import { WishlistService } from './../../../../core/services/wishlist.service';
import { CartService } from './../../../../core/services/cart.service';

@Component({
  templateUrl: './cart.container.html',
  styleUrls: ['./cart.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartContainer implements OnInit, OnDestroy {

  public items: ICartItemFormat[] = [];

  public totalPrice: number = 0;

  private _destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _cdRef: ChangeDetectorRef,
  ) { }

  public get loading$(): Observable<boolean> {
    return this._cartService.loadingStatus$;
  }

  public get cart(): CartService {
    return this._cartService;
  }

  public get wishlist(): WishlistService {
    return this._wishlistService;
  }

  public ngOnInit(): void {
    this._listenCartChanges();
    this._listenWishlistChanges();

    this.cart.getData();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public addToWishlist(
    {
      id, name,
      brand, price,
      category, mainImage,
      images, isInCart,
      isInWishlist,
    }: ICartItemFormat,
    ): void {
    const item = {
      id,
      name,
      brand,
      price,
      category,
      mainImage,
      images,
      isInCart,
      isInWishlist,
    };
    this.wishlist.add(item);
  }

  public deleteFromWishlist(): void {

  }

  public updateItem(item: ICartItemFormat): void {
    this.cart.update(item);
  }

  public deleteItem(item: ICartItemFormat): void {
    this.cart.delete(item);
  }

  public openItemDetails(
    { id, name, brand, price, mainImage, images }: ICartItemFormat,
    ): void {
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

  public openDeleteConfirming(item: ICartItemFormat): void {
    // отправление данных в компонент модалки после открытия
    const confirmModal = this.dialog.open(DeleteConfirmingComponent, {
      data: {
        id: item.id,
        name: item.name,
      },
    });
    confirmModal.afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (result) => {
          if (!result) {
            return;
          }
          this.cart.delete(item);
        });
  }


  private _listenCartChanges(): void {
    this.cart.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (data: ICartResponseFormat) => {
          const { items, totalPrice } = data;
          this.items = items;
          this.totalPrice = totalPrice;

          this._cdRef.markForCheck();
          this.cart.stopLoading();
        },
        error: (error) => {
          console.error(error);
          this.cart.stopLoading();
        },
      },
      );
  }


  private _listenWishlistChanges(): void {
    this.wishlist.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this._cdRef.markForCheck();
          this.cart.stopLoading();
        },
        error: (error) => {
          console.error(error);
          this.cart.stopLoading();
        },
      },
      );
  }

}
