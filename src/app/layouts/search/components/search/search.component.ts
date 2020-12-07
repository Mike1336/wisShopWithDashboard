import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ReplaySubject } from 'rxjs';
import { tap, debounceTime, takeUntil, pluck } from 'rxjs/operators';

import { ItemDetailsComponent } from 'src/app/layouts/item-details/components/item-details.component';

import { DataService } from './../../../../catalog/services/data.service';
import { IProductDataFormat } from './../../../../core/interfaces/data-formats';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  public loading!: boolean;
  public emptyResult!: boolean;

  public searchForm!: FormGroup;

  public foundItems!: IProductDataFormat[];

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    public dialog: MatDialog,
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
    ) {}

  public ngOnInit(): void {
    this._initForm();
  }

  public ngAfterViewInit(): void {
    this._listenControl();
    this._listenData();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public findItems(itemName: string): void {
    this._route.params
      .pipe(
        takeUntil(
          this._destroy$,
        ),
      )
      .subscribe(
        (category) => {
          if (itemName) {
            this._dataService.getDataByItemName(itemName, 'phones');
          }
        },
      );
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
      searchField: new FormControl(''),
    });
  }

  private _listenControl(): void {
    if (!this.searchForm.get('searchField')) {
      console.error('searchField is null');

      return;
    }
    this.searchForm.get('searchField')?.valueChanges
      .pipe(
      tap(() => this.loading = true),
      debounceTime(500),
      takeUntil(this._destroy$),
    )
      .subscribe(
      (fieldData: string) => {
        if (!fieldData) {
          return;
        }
        this.findItems(fieldData);
        this.loading = false;
      },
    );
  }

  private _listenData(): void {
    this._dataService.searchStream$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (data) => {
          console.log(data);

          data.length === 0
          ? this.emptyResult = true
          : this.emptyResult = false;

          this.foundItems = data;

          this._cdRef.markForCheck();
        },
      );
  }

}
