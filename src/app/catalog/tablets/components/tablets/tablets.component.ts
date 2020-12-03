import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { IProductDataFormat } from './../../../../core/interfaces/data-formats';

@Component({
  selector: 'tablets-component',
  templateUrl: './tablets.component.html',
  styleUrls: ['./tablets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabletsComponent implements OnInit {

  @Input()
  public item!: IProductDataFormat;

  constructor() { }

  public ngOnInit(): void {
  }

}
