import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { DataService } from './services/data.service';
@Component({
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})

export class CatalogComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  public get loadingStatus$(): Observable<boolean> {
    return this._dataService.loadingStatus$;
  }


  public ngOnInit(): void {
  }

}
