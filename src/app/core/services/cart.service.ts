import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

import { ICartItemFormat, ICartResponseFormat, IProductDataFormat } from '../interfaces/data-formats';
import { environment } from '../../../environments/environment';

import { DataService } from './data.service';


@Injectable()

export class CartService {

  private _apiUrl = environment.apiUrl;

  private _data: ICartItemFormat[] = [];

  private _data$ = new ReplaySubject<ICartResponseFormat>(1);

  constructor(private _http: HttpClient, private _dataService: DataService) {}

  public get data$(): Observable<ICartResponseFormat> {
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
    this._http.get(`${this._apiUrl}cart`)
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
    const cartItem: ICartItemFormat = {
      ...item,
      quantity: 1,
      totalPrice: item.price,
    };
    cartItem.isInCart = true;

    this._http.put(`${this._apiUrl}cart`, cartItem)
      .pipe(
        delay(1500),
      )
      .subscribe({
        next: () => {
          item.isInCart = true;
          this._dataService.updateItem(item.category.name.toLowerCase(), item);
          this.getData();
        },
        error: (error) => {
          console.error(error);

          this._data$.error(error);
        },
      });
  }

  public update(item: ICartItemFormat): void {
    this.startLoading();
    this._http.post(`${this._apiUrl}cart`, item)
      .pipe(
        delay(1500),
      )
      .subscribe({
        next: () => {
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
    this._http.delete(`${this._apiUrl}cart/${item.id}`)
      .pipe(
        delay(1500),
      )
      .subscribe({
        next: () => {
          item.isInCart = false;
          this._dataService.updateItem(item.category.name.toLowerCase(), item);
          this.getData();
        },
        error: (error) => {
          console.error(error);

          this._data$.error(error);
        },
      });
  }

  private _changeData(value: ICartItemFormat[]): void {
    this._data = value;
    this._data$.next(this._getDataInCorrectFormat());
  }

  private _getDataInCorrectFormat(): ICartResponseFormat {
    let totalPrice = 0;

    if (this._data.length) {
      totalPrice = this._data.map(
            (item: ICartItemFormat) => {
            return item.totalPrice;
            },
        )
        .reduce(
            (prevItemPrice: number, currItemPrice: number) => {
              return prevItemPrice + currItemPrice;
            },
        );
    }

    return {
      items: this._data,
      totalPrice,
    };
  }

}
