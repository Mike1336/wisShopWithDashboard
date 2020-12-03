import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay } from 'rxjs/operators';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';

import { IProductResponceFormat } from '../../core/interfaces/data-formats';
import { IQueryParams } from '../../layouts/table/interfaces/response-format';
import { environment } from '../../../environments/environment';

export const enum Breakpoints {
    phones = 'phones',
    tablets = 'tablets',
    laptops = 'laptops',
}

@Injectable()

export class DataService {

  private _apiUrl = environment.apiUrl;

  private _data!: any;

  private _dataStream$ = new ReplaySubject<IProductResponceFormat>(1);

  private _loadingStatus$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  public get dataStream$(): Observable<IProductResponceFormat> {
    return this._dataStream$.asObservable();
  }

  public get loadingStatus$(): Observable<boolean> {
    return this._loadingStatus$.asObservable();
  }

  public getPhones(params: IQueryParams): void {
    this._getData(params, Breakpoints.phones);
  }

  public getTablets(params: IQueryParams): void {
    this._getData(params, Breakpoints.tablets);
  }

  public getLaptops(params: IQueryParams): void {
    this._getData(params, Breakpoints.laptops);
  }

  private _getData(params: IQueryParams, breakpoint: Breakpoints): void {
    this._loadingStatus$.next(true);

    this._http.get(`${this._apiUrl}${breakpoint}`)
      .pipe(
      delay(1500),
    )
      .subscribe({
        next: (data: any) => {
          this._data = data;

          this._dataStream$.next(this._getDataInCorrectFormat(params));
          this._loadingStatus$.next(false);
        },
        error: (error) => {
          console.error(error);

          this._dataStream$.error(error);
          this._loadingStatus$.next(false);
        },
      });
  }

  private _getDataInCorrectFormat(params: IQueryParams): IProductResponceFormat {
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
