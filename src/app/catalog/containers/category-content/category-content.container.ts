import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataService } from '../../services/data.service';

import { ItemDetailsComponent } from './../../../layouts/item-details/components/item-details.component';
import { IProductDataFormat } from './../../../core/interfaces/data-formats';
import { WishlistService } from './../../../wishlist/services/wishlist.service';
import { Wishlist } from './../../../wishlist/classes/wishlist';
import { Cart } from './../../../cart/classes/cart';
import { CartService } from './../../../cart/services/cart.service';

@Component({
  selector: 'category-content',
  templateUrl: './category-content.container.html',
  styleUrls: ['./category-content.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryContentContainer implements OnInit, OnChanges, OnDestroy {

  @Input()
  public category = '';

  public records = 0;
  public currentPage = 1;
  public pageSize = 5;

  public data: IProductDataFormat[] = [];

  private _destroy$ = new ReplaySubject<void>();

  constructor(
    public dialog: MatDialog,
    private _dataService: DataService,
    private _cardService: CartService,
    private _wishlistService: WishlistService,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public get loadingStatus$(): Observable<boolean> {
    return this._dataService.loadingStatus$;
  }

  public get cart(): Cart {
    return this._cardService.cart;
  }

  public get wishlist(): Wishlist {
    return this._wishlistService.wishlist;
  }

  public ngOnInit(): void {
    this._listenData();
    this._listenCartChanges();
    this._listenWishlistChanges();
  }

  public ngOnChanges(): void {
    this.getData(this.category);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getData(category: string): void {
    this._dataService.getData(category, { page: this.currentPage, pageSize: this.pageSize });
  }

  public onChangePage(): void {
    this._dataService.startLoading();
    this.getData(this.category);
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

  public checkInCart(item: IProductDataFormat): void {
    this.cart.updateList(item);
  }

  public checkInWishlist(item: IProductDataFormat): void {
    this.wishlist.updateList(item);
  }

  private _listenData(): void {
    this._dataService.dataStream$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (responce) => {
          this.data = responce.data;
          this.records = responce.paging.records;
          this._cdRef.markForCheck();
          this._dataService.stopLoading();
        },
        error: (error) => {
          console.error(error);
          this._dataService.stopLoading();
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

}
