import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import { IProductDataFormat } from './../../../core/interfaces/data-formats';

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
  public clickToCart = new EventEmitter<IProductDataFormat>();

  @Output()
  public clickToWish = new EventEmitter<IProductDataFormat>();

  constructor() { }

  public emitClickToContent(): void {
    this.clickToContent.emit(this.item);
  }

  public emitClickToCart(): void {
    this.clickToCart.emit(this.item);
  }

  public emitClickToWish(): void {
    this.clickToWish.emit(this.item);
  }


}
