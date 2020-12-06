import { Subject, Observable } from 'rxjs';

import { ICartItem, IProductDataFormat } from './../../core/interfaces/data-formats';

export class Cart {

  private _list: ICartItem[] = [];
  private _totalPrice = 0;

  private _change$ = new Subject<void>();

  constructor() {
  }

  public get list(): ICartItem[] {
    return this._list;
  }

  public get totalPrice(): number {
    return this._totalPrice;
  }

  public get change$(): Observable<void> {
    return this._change$.asObservable();
  }

  public isExist(item: IProductDataFormat): boolean {
    return this.list.some((i: IProductDataFormat) => {
      return i.id === item.id;
    });
  }

  public updateList(item: IProductDataFormat): void { // adding or deleting item
    const itemInList = this.list.find((i: ICartItem) => {
      return i.id === item.id;
    });

    if (!itemInList) {
      this._addItem(item);

      return;
    }

    this._deleteItem(item);
  }

  private _addItem(item: IProductDataFormat): void {
    this._list.push({ ...item, quantity: 1 });
    this._updateTotalPrice();
    this._change$.next();
  }

  private _deleteItem(item: IProductDataFormat): void {
    this._list = this._list
    .filter((element) => element.id !== item.id);
    this._updateTotalPrice();
    this._change$.next();
  }

  private _updateTotalPrice(): void {
    if (!this.list.length) {
      return;
    }

    this._totalPrice = this._list
        .map((item) => item.price * item.quantity)
            .reduce((prevItem, currItem) => {
              return prevItem + currItem;
            },
            );
  }

}
