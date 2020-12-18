import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { IProductResponseFormat, IProductDataFormat } from '../../core/interfaces/data-formats';
import { IQueryParams } from '../../layouts/table/interfaces/response-format';
import { environment } from '../../../environments/environment';


@Injectable()

export class DataService {

  private _apiUrl = environment.apiUrl;

  private _data: IProductDataFormat[] = [];

  private _data$ = new Subject<IProductResponseFormat>();

  constructor(private _http: HttpClient) {}

  public get data$(): Observable<IProductResponseFormat> {
    return this._data$.asObservable();
  }

  public getCategories(): Observable<any> {
    return this._http.get(`${this._apiUrl}categories`);
  }

  public getDataByItemName(value: string): void {
    this._http.get(`${this._apiUrl}all`)
      .subscribe({
        next: (data: any) => {
          if (!('length' in data)) {
            this._data$.error('Data is not array');

            return;
          }
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
    this._http.get(`${this._apiUrl}${category}`)
      .pipe(
      delay(1500),
    )
      .subscribe({
        next: (data: any) => {
          if (!data.length) {
            console.error('Data is not array');

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

  public getData(params: IQueryParams, category?: string): Observable<IProductResponseFormat> {
    if (category) {
      this.getDataOfCategory(category, params);

      return this.data$;
    }

    this._http.get(`${this._apiUrl}all`)
      .subscribe({
        next: (data: any) => {
          if (!data.length) {
            console.error('Data is not array');

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

    return this.data$;
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
