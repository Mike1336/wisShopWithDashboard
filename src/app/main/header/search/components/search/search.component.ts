import {
  Component,
   OnInit,
   OnDestroy,
   ChangeDetectionStrategy,
  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { ReplaySubject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

import { DataService } from '../../../../services/data.service';
import { IProductDataFormat } from '../../../../../core/interfaces/data-formats';
import { ItemDetailsComponent } from '../../../../../layouts/item-details/components/item-details.component';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {

  public searchForm!: FormGroup;
  public searchField = new FormControl('');

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    public dialog: MatDialog,
    private _dataService: DataService,
    private _searchService: SearchService,
    ) {}

  public ngOnInit(): void {
    this._initForm();
    this._listenControl();
    this._listenSearchReset();
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
        tap(() => this._dataService.startLoading()),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (fieldData: string) => {
          this._searchItems(fieldData);
        },
      });
  }

  private _searchItems(itemName: string): void {
    this._searchService.setQuery(itemName);
    this._dataService.getDataByItemName(itemName);
  }

  private _listenSearchReset(): void {
    this._searchService.reset$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        () => {
          this.searchField.reset();
        },
      );
  }

}
