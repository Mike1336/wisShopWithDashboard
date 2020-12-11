import { Router } from '@angular/router';
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

import { SearchService } from '../../../header/search/services/search.service';
import { DataService } from '../../../../core/services/data.service';
import { ItemDetailsComponent } from '../../../../layouts/item-details/components/item-details.component';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { Wishlist } from '../../../wishlist/classes/wishlist';
import { Cart } from '../../../cart/classes/cart';
import { CartService } from '../../../cart/services/cart.service';
import { IProductDataFormat } from '../../../../core/interfaces/data-formats';

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

  public searchQuery = '';

  private _destroy$ = new ReplaySubject<void>();

  constructor(
    public dialog: MatDialog,
    private _dataService: DataService,
    private _cardService: CartService,
    private _wishlistService: WishlistService,
    private _searchService: SearchService,
    private _router: Router,
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

  public get searchIsEnable(): boolean {
    return this._searchService.isEnable;
  }

  public ngOnInit(): void {
    this._listenData();
    this._listenCartChanges();
    this._listenWishlistChanges();
    this._listenSearchStatus();
  }

  public ngOnChanges(): void {
    this.getData(this.category);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getData(category: string): void {
    this._dataService.startLoading();
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

  public cancelSearch(): void {
    this._dataService.startLoading();
    this._searchService.resetQuery();
    this.getData(this.category);
  }

  private _listenData(): void {
    this._dataService.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (response) => {
          this.data = response.data;
          this.records = response.paging.records;
          this._cdRef.markForCheck();
          this._dataService.stopLoading();
        },
        error: (error) => {
          console.error(error);
          this._dataService.stopLoading();
          this._router.navigate(['/404'], { skipLocationChange: true });
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

  private _listenSearchStatus(): void {
    this._searchService.query$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (searchValue) => {
          if (!searchValue) {
            this.searchQuery = '';
            this.getData(this.category);
          }
          this.searchQuery = searchValue;
          this._cdRef.markForCheck();
        },
      );
  }

}
