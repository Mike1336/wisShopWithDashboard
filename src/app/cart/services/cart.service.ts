import { Injectable } from '@angular/core';

import { Cart } from './../classes/cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {

  private _cart = new Cart();

  public get cart(): Cart {
    return this._cart;
  }

}
