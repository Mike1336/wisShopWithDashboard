import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { IProductDataFormat } from './../../../core/interfaces/data-formats';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit {

  @Input()
  public item!: IProductDataFormat;

  constructor() { }

  public ngOnInit(): void {
  }

}
