import { Component, OnInit } from '@angular/core';

import { PhoneStoreService } from '../../../services/phone-store.service';

import {
  IConfigFormat,
  IQueryParams,
} from './../../../../layouts/table/interfaces/response-format';
import { IProductDataFormat } from './../../../../core/interfaces/data-formats';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public config!: IConfigFormat;

  constructor(private _phoneStoreService: PhoneStoreService) { }

  public ngOnInit(): void {
    this.config = {
      fetch: (query: IQueryParams) => {
        console.log(query);

        return this._phoneStoreService.getData(query);
      },
      pagination: {
        limits: [1, 2, 5, 10, 12],
        pageSize: 10,
      },
      actions: [
        {
          label: 'Move',
          click: (row: IProductDataFormat) => {
            console.log('Row Move', row);
          },
        },
        {
          label: 'Edit',
          click: (row: IProductDataFormat) => {
            console.log('Row Edit', row);
          },
        },
        {
          label: 'Delete',
          click: (row: IProductDataFormat) => {
            console.log('Row Delete', row);
          },
        },
      ],
    };
  }


}