import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { ICartItemFormat } from './../../../../core/interfaces/data-formats';

@Component({
  selector: 'cart-component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {

  @Input()
  public items!: ICartItemFormat[];

  @Input()
  public totalPrice!: number;

  @Output()
  private clickOnProduct = new EventEmitter<ICartItemFormat>();

  @Output()
  private deleteItem = new EventEmitter<ICartItemFormat>();

  @Output()
  private increasedItemCount = new EventEmitter<ICartItemFormat>();

  @Output()
  private clickOnWish = new EventEmitter<ICartItemFormat>();

  constructor() { }

  public emitClickOnProduct(product: ICartItemFormat): void {
    this.clickOnProduct.emit(product);
  }

  public emitClickToDeleteFromCart(product: ICartItemFormat): void {
    this.deleteItem.emit(product);
  }

  public emitClickToAddToWishlist(product: ICartItemFormat): void {
    this.clickOnWish.emit(product);
  }
  public emitClickToDeleteFromWishlist(product: ICartItemFormat): void {
    this.clickOnWish.emit(product);
  }


  public checkCount(item: ICartItemFormat, quantity: number): void {
    if (quantity === 0) {
      this.deleteItem.emit(item);

      return;
    }

    const itemClone = { ...item };
    itemClone.quantity = quantity;
    itemClone.totalPrice = itemClone.price * quantity;

    this.increasedItemCount.emit(itemClone);
  }

}
