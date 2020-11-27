import { Component, OnInit } from '@angular/core';

import { IConfigFormat, IQueryParams } from '../shared/table/interfaces/response-format';

import { PhoneStoreService } from './../shared/services/phone-store.service';

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

        return this._phoneStoreService.getPhones(query);
      },
      pagination: {
        limits: [1, 2, 5, 10, 12],
        pageSize: 10,
      },
      actions: [
        {
          label: 'Move',
          click: (row) => {
            console.log('Row Move', row);
          },
        },
        {
          label: 'Edit',
          click: (row) => {
            console.log('Row Edit', row);
          },
        },
        {
          label: 'Delete',
          click: (row) => {
            console.log('Row Delete', row);
          },
        },
      ],
    };
  }


}
