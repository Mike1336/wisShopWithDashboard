import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import { IProductDataFormat } from '../../../../core/interfaces/data-formats';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {

  @Input()
  public item!: IProductDataFormat;

  @Input()
  public isInCart!: boolean;

  @Input()
  public isInWishlist!: boolean;

  @Output()
  public clickToContent = new EventEmitter<IProductDataFormat>();

  @Output()
  public addToCart = new EventEmitter<IProductDataFormat>();

  @Output()
  public deleteFromCart = new EventEmitter<IProductDataFormat>();

  @Output()
  public addToWishlist = new EventEmitter<IProductDataFormat>();

  @Output()
  public deleteFromWishlist = new EventEmitter<IProductDataFormat>();

  constructor() { }

  public emitClickToContent(): void {
    this.clickToContent.emit(this.item);
  }

  public emitClickToAddToCart(): void {
    this.addToCart.emit(this.item);
  }

  public emitClickToDeleteFromCart(): void {
    this.deleteFromCart.emit(this.item);
  }

  public emitClickToAddToWishlist(): void {
    this.addToWishlist.emit(this.item);
  }

  public emitClickToDeleteFromWishlist(): void {
    this.deleteFromWishlist.emit(this.item);
  }

}
