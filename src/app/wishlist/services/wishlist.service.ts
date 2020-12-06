import { Injectable } from '@angular/core';

import { Wishlist } from '../classes/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private _wishlist = new Wishlist();

  public get wishlist(): Wishlist {
    return this._wishlist;
  }

}
