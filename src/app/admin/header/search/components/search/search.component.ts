import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { ReplaySubject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { DataService } from '../../../../../core/services/data.service';
import { IProductDataFormat } from '../../../../../core/interfaces/data-formats';
import { ItemDetailsComponent } from '../../../../../layouts/item-details/components/item-details.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {

  public loading!: boolean;
  public emptyResult!: boolean;

  public searchForm!: FormGroup;
  public searchField = new FormControl('');

  public searchResults!: IProductDataFormat[];

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    public dialog: MatDialog,
    private _dataService: DataService,
    private _cdRef: ChangeDetectorRef,
    ) {}


  public ngOnInit(): void {
    this._initForm();
    this._listenControl();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


  public openDetails({ id, name, brand, price, mainImage, images }: IProductDataFormat): void {
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

  private _initForm(): void {
    this.searchForm = new FormGroup({
      field: this.searchField,
    });
  }

  private _listenControl(): void {
    this.searchField.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (fieldData: string) => {
          if (!fieldData) {
            return;
          }
          this.loading = true;
          this._cdRef.markForCheck();
          this._searchItems(fieldData);
        },
      });
  }

  private _searchItems(itemName: string): void {
    // this._dataService.searchResult$
    //   .pipe(
    //     takeUntil(this._destroy$),
    //   )
    //   .subscribe(
    //     (searchResults: IProductDataFormat[]) => {
    //       this.loading = false;

    //       if (!this.searchField.value) {
    //         return;
    //       }

    //       searchResults.length === 0
    //       ? this.emptyResult = true
    //       : this.emptyResult = false;

    //       this.searchResults = searchResults;

    //       this._cdRef.markForCheck();
    //     },
    //   );

    this._dataService.getDataByItemName(itemName, 'phones');
  }

}
