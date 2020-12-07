import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { IProductDataFormat, IProductResponceFormat } from '../../core/interfaces/data-formats';
import { IQueryParams } from '../../layouts/table/interfaces/response-format';
import { environment } from '../../../environments/environment';

import { ICategoryFormat } from './../../core/interfaces/data-formats';

@Injectable({
  providedIn: 'root',
})

export class DataService {

  private _apiUrl = environment.apiUrl;

  private _data = [];

  private _dataStream$ = new Subject<IProductResponceFormat>();

  private _searchStream$ = new Subject<IProductDataFormat[]>();

  private _loadingStatus$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  public get dataStream$(): Observable<IProductResponceFormat> {
    return this._dataStream$.asObservable();
  }

  public get searchStream$(): Observable<IProductDataFormat[]> {
    return this._searchStream$.asObservable();
  }

  public get loadingStatus$(): Observable<boolean> {
    return this._loadingStatus$.asObservable();
  }

  public startLoading(): void {
    this._loadingStatus$.next(true);
  }

  public stopLoading(): void {
    this._loadingStatus$.next(false);
  }

  public getCategories(): Observable<any> {
    return this._http.get(`${this._apiUrl}categories`);
  }

  public getDataByItemName(value: string, category: string): void {
    this._http.get(`${this._apiUrl}${category}`)
      .subscribe({
        next: (data: any) => {
          if (data.length === 0) {
            console.error('Data is not array');

            return;
          }
          this._searchStream$.next(data.filter((el: IProductDataFormat) => el.name === value));
        },
        error: (error) => {
          console.error(error);

          this._dataStream$.error(error);
        },
      });
  }

  public getData(category: string, params?: IQueryParams): void {
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
          this._dataStream$.next(this._getDataInCorrectFormat(params));
        },
        error: (error) => {
          console.error(error);

          this._dataStream$.error(error);
        },
      });
  }

  // private _getAllData(): IProductResponceFormat {
  //   this.getCategories()
  //     .subscribe(
  //       (categories: ICategoryFormat[]) => {
  //         categories.forEach((category) => this.get)
  //       }
  //     )
  // }

  private _getDataInCorrectFormat(params?: IQueryParams): IProductResponceFormat {
    if (!params) {
      return {
        data: this._data,
        paging: {
          records: this._data.length,
          limit: this._data.length,
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
