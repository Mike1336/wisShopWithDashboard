import { Component, Input, OnInit } from '@angular/core';

import { IProductDataFormat } from './../../../../core/interfaces/data-formats';

@Component({
  selector: 'phones-component',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss'],
})
export class PhonesComponent implements OnInit {

  @Input()
  public item!: IProductDataFormat;

  constructor() { }

  public ngOnInit(): void {
  }

}
