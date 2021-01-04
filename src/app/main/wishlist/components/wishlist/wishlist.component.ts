import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ICartItemFormat, IProductDataFormat } from '../../../../core/interfaces/data-formats';

@Component({
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent {

  @Input()
  public items!: IProductDataFormat[];

  @Output()
  private clickOnProduct = new EventEmitter<IProductDataFormat>();

  @Output()
  private deleteItem = new EventEmitter<IProductDataFormat>();

  @Output()
  private clickOnCart = new EventEmitter<IProductDataFormat>();

  constructor() { }

  public emitClickOnProduct(product: ICartItemFormat): void {
    this.clickOnProduct.emit(product);
  }

  public emitClickToDeleteFromWishlist(product: ICartItemFormat): void {
    this.deleteItem.emit(product);
  }

  public emitClickToAddToCart(product: ICartItemFormat): void {
    this.clickOnCart.emit(product);
  }
  public emitClickToDeleteFromCart(product: ICartItemFormat): void {
    this.clickOnCart.emit(product);
  }

}
