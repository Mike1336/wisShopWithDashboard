import { Observable, Subject } from 'rxjs';

import { IProductDataFormat } from './../../core/interfaces/data-formats';

export class Wishlist {

  private _list: IProductDataFormat[] = [];

  private _change$ = new Subject<void>();

  constructor() {
  }

  public get list(): IProductDataFormat[] {
    return this._list;
  }

  public get change$(): Observable<void> {
    return this._change$.asObservable();
  }


  public isExist(item: IProductDataFormat): boolean {
    return this.list.some((i: IProductDataFormat) => {
      return i.id === item.id;
    });
  }

  public updateList(item: IProductDataFormat): void {
    // adding or deleting item
    const itemInList = this.list.find((i: IProductDataFormat) => {
      return i.id === item.id;
    });

    if (!itemInList) {
      this._addItem(item);

      return;
    }

    this._deleteItem(item);
  }

  private _addItem(item: IProductDataFormat): void {
    this._list.push(item);
    this._change$.next();
  }

  private _deleteItem(item: IProductDataFormat): void {
    this._list = this._list
    .filter((element) => element.id !== item.id);
    this._change$.next();
  }

}
