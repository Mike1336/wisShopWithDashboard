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
import { WishlistService } from '../../../../core/services/wishlist.service';
import { CartService } from '../../../../core/services/cart.service';
import { IProductDataFormat, IProductResponseFormat } from '../../../../core/interfaces/data-formats';

@Component({
  selector: 'category-content',
  templateUrl: './category-content.container.html',
  styleUrls: ['./category-content.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryContentContainer implements OnInit, OnChanges, OnDestroy {

  @Input()
  public category = '';

  @Input()
  public pageNumber = 1;

  public records = 0;
  public pageSize = 5;

  public categoryData: IProductDataFormat[] = [];

  public searchQuery = '';

  private _destroy$ = new ReplaySubject<void>();

  constructor(
    public dialog: MatDialog,
    private _dataService: DataService,
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _searchService: SearchService,
    private _router: Router,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public get loadingStatus$(): Observable<boolean> {
    return this._dataService.loadingStatus$;
  }

  public get searchIsEnable(): boolean {
    return this._searchService.isEnable;
  }

  public ngOnInit(): void {
    this._listenData();
    this._listenCart();
    this._listenWishlist();
    this._listenSearchStatus();
  }

  public ngOnChanges(): void {
    this.getData();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getData(): void {
    const params = {
      page: this.pageNumber,
      pageSize: this.pageSize,
    };

    this._dataService.startLoading();
    this._dataService.getDataOfCategory(this.category, params);
  }

  public onChangePage(page: number): void {
    this.pageNumber = page;
    this._changeUrl();
    this.getData();
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

  public addToCart(item: IProductDataFormat): void {
    this._cartService.add(item);
  }

  public deleteFromCart(item : IProductDataFormat): void {
    this._cartService.delete(item);
  }

  public addToWishlist(item: IProductDataFormat): void {
    this._wishlistService.add(item);
  }

  public deleteFromWishlist(item : IProductDataFormat): void {
    this._wishlistService.delete(item);
  }

  public cancelSearch(): void {
    this._searchService.resetQuery();
    this.getData();
  }

  public refreshData(): void {
    this.getData();
  }

  private _changeUrl(): void {
    this._router.navigate([`/catalog/${this.category}/${this.pageNumber}`]);
  }

  private _listenData(): void {
    this._dataService.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (response: IProductResponseFormat) => {
          const { data, paging: { records } } = response;

          if (data.length === 0 && !this.searchIsEnable) {
            return;
          }
          this.categoryData = data;
          this.records = records;
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

  private _listenCart(): void {
    this._cartService.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        () => {
          this._cdRef.markForCheck();
          this._cartService.stopLoading();
        },
      );
  }

  private _listenWishlist(): void {
    this._wishlistService.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        () => {
          this._cdRef.markForCheck();
          this._wishlistService.stopLoading();
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
            this.getData();

            return;
          }
          this.searchQuery = searchValue;
          this._cdRef.markForCheck();
        },
      );
  }

}
