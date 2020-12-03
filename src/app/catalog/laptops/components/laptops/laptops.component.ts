import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { IProductDataFormat } from './../../../../core/interfaces/data-formats';

@Component({
  selector: 'laptops-component',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaptopsComponent implements OnInit {

  @Input()
  public item!: IProductDataFormat;

  constructor() { }

  public ngOnInit(): void {
  }

}
