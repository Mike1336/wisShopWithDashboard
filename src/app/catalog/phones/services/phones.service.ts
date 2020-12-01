import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ReplaySubject, Observable } from 'rxjs';

import { IProductResponceFormat } from './../../../core/interfaces/data-formats';
import { IQueryParams } from './../../../layouts/table/interfaces/response-format';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhonesService {

  private _apiUrl = environment.apiUrl;
  private _phonesPoint = 'phones';

  private _data!: any;

  private _dataStream$ = new ReplaySubject<IProductResponceFormat>(1);

  constructor(private _http: HttpClient) {}

  public get dataStream$(): Observable<IProductResponceFormat> {
    return this._dataStream$.asObservable();
  }

  public getData(params: IQueryParams): void {
    this._http.get(`${this._apiUrl}${this._phonesPoint}`)
      .subscribe({
        next: (data: any) => {
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
