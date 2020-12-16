import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { IQueryParams } from '../../layouts/table/interfaces/response-format';
import { environment } from '../../../environments/environment';

import { IProductResponceFormat, IProductDataFormat } from './../../core/interfaces/data-formats';


@Injectable()

export class DataService {

  private _apiUrl = environment.apiUrl;

  private _data = [];

  private _category = '';

  private _data$ = new Subject<IProductResponceFormat>();

  private _loadingStatus$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  public get data$(): Observable<IProductResponceFormat> {
    return this._data$.asObservable();
  }

  public get loadingStatus$(): Observable<boolean> {
    return this._loadingStatus$.asObservable();
  }

  public startLoading(): void {
    console.log('start');
    this._loadingStatus$.next(true);
  }

  public stopLoading(): void {
    console.log('stop');
    this._loadingStatus$.next(false);
  }

  public getCategories(): Observable<any> {
    return this._http.get(`${this._apiUrl}categories`);
  }

  public getDataByItemName(value: string): void {
    this._http.get(`${this._apiUrl}${this._category}`)
      .subscribe({
        next: (data: any) => {
          this._data = data.filter((el: IProductDataFormat) => el.name.indexOf(value) !== -1);

          this._data$.next(this._getDataInCorrectFormat());
        },
        error: (error) => {
          console.error(error);

          this._data$.error(error);
        },
      });
  }

  public getDataOfCategory(category: string, params?: IQueryParams): void {
    this._category = category;
    this._http.get(`${this._apiUrl}${category}`)
      .pipe(
      delay(1500),
    )
      .subscribe({
        next: (data: any) => {
          console.log(data)
          if (!data || !data.length) {
            console.error('Empty data');

            return;
          }
          this._data = data;
          this._data$.next(this._getDataInCorrectFormat(params));
        },
        error: (error) => {
          console.error(error);

          this._data$.error(error);
        },
      });
  }

  private _getDataInCorrectFormat(params?: IQueryParams): IProductResponceFormat {
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

    const limit = params.pageSize;
    const offset = (limit * params.page) - limit;

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
