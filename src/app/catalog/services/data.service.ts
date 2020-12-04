import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay, share, tap, debounceTime } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { IProductResponceFormat } from '../../core/interfaces/data-formats';
import { IQueryParams } from '../../layouts/table/interfaces/response-format';
import { environment } from '../../../environments/environment';

@Injectable()

export class DataService {

  private _apiUrl = environment.apiUrl;

  private _data = [];

  private _dataStream$ = new Subject<IProductResponceFormat>();

  private _loadingStatus$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  public get dataStream$(): Observable<IProductResponceFormat> {
    return this._dataStream$.asObservable();
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

  public getData(category: string, params: IQueryParams): void {
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
