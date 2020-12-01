import { Component, OnInit, OnDestroy } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IProductDataFormat } from './../../../../core/interfaces/data-formats';
import { IQueryParams } from './../../../../layouts/table/interfaces/response-format';
import { PhonesService } from './../../services/phones.service';

@Component({
  selector: 'phones-container',
  templateUrl: './phones.container.html',
  styleUrls: ['./phones.container.scss'],
})
export class PhonesContainer implements OnInit, OnDestroy {

  public data!: IProductDataFormat[];

  private _destroy$ = new ReplaySubject<void>();

  constructor(private _phonesService: PhonesService) { }

  public ngOnInit(): void {
    this._listenData();
    this.getData({
      page: 2,
      pageSize: 5,
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getData(params: IQueryParams): void {
    this._phonesService.getData(params);
  }

  private _listenData(): void {
    this._phonesService.dataStream$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (responce) => {
          this.data = responce.data;
          console.log(responce)
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

}
