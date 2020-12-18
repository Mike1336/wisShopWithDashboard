import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

import { IQueryParams } from '../../layouts/table/interfaces/response-format';
import { ICartItemFormat, IProductDataFormat, IProductResponseFormat } from '../interfaces/data-formats';
import { environment } from '../../../environments/environment';

import { DataService } from './data.service';


@Injectable()

export class WishlistService {

  private _apiUrl = environment.apiUrl;

  private _data: IProductDataFormat[] = [];

  private _data$ = new ReplaySubject<IProductResponseFormat>(1);

  constructor(private _http: HttpClient, private _dataService: DataService) {}

  public get data$(): Observable<IProductResponseFormat> {
    return this._data$.asObservable();
  }

  public get loadingStatus$(): Observable<boolean> {
    return this._dataService.loadingStatus$;
  }

  public startLoading(): void {
    this._dataService.startLoading();
  }

  public stopLoading(): void {
    this._dataService.stopLoading();
  }

  public getData(): void {
    this.startLoading();

    this._http.get(`${this._apiUrl}wishlist`)
      .pipe(
      delay(1500),
    )
      .subscribe({
        next: (data: any) => {
          this._changeData(data);
        },
        error: (error) => {
          this._data$.error(error);
        },
      });
  }

  public add(item: IProductDataFormat): void {
    this.startLoading();

    this._http.put(`${this._apiUrl}wishlist`, item)
      .pipe(
        delay(1500),
      )
      .subscribe({
        next: () => {
          item.isInWishlist = true;
          this._dataService.updateItem(item.category.name.toLowerCase(), item);
          this.getData();
        },
        error: (error) => {
          console.error(error);

          this._data$.error(error);
        },
      });
  }

  public delete(item: IProductDataFormat): void {
    this.startLoading();

    this._http.delete(`${this._apiUrl}wishlist/${item.id}`)
      .pipe(
        delay(1500),
      )
      .subscribe({
        next: () => {
          item.isInWishlist = false;
          this._dataService.updateItem(item.category.name.toLowerCase(), item);
          this.getData();
        },
        error: (error) => {
          console.error(error);

          this._data$.error(error);
        },
      });
  }

  private _changeData(value: ICartItemFormat[], params?: IQueryParams): void {
    this._data = value;
    this._data$.next(this._getDataInCorrectFormat(params));
  }

  private _getDataInCorrectFormat(params?: IQueryParams): IProductResponseFormat {
    if (!params) {
      return {
        data: this._data,
        paging: {
          records: this._data.length,
          limit: this._data.length < 10 ? this._data.length : 10,
          offset: 0,
        },
      };
    }

    const limit: number = params.pageSize;
    const offset: number = (limit * params.page) - limit;

    const editedData = this._data.slice(offset, offset + limit);

    return {
      data: editedData ?? this._data,
      paging: {
        records: this._data.length,
        limit,
        offset,
      },
    };
  }

}
