import { Component, Input, OnInit } from '@angular/core';

import { ICartItem } from './../../../../core/interfaces/data-formats';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {

  @Input()
  public item!: ICartItem;

  constructor() { }

  public ngOnInit(): void {
  }

}
