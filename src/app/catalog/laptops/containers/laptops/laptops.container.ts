import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataService } from './../../../services/data.service';
import { IProductDataFormat } from './../../../../core/interfaces/data-formats';
import { IQueryParams } from './../../../../layouts/table/interfaces/response-format';
@Component({
  selector: 'laptops-container',
  templateUrl: './laptops.container.html',
  styleUrls: ['./laptops.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaptopsContainer implements OnInit, OnDestroy {

  public records = 0;
  public currentPage = 1;
  public pageSize = 5;

  public data!: IProductDataFormat[];

  private _destroy$ = new ReplaySubject<void>();

  constructor(private _dataService: DataService) { }

  public get loadingStatus$(): Observable<boolean> {
    return this._dataService.loadingStatus$;
  }

  public ngOnInit(): void {
    this._listenData();
    this.getData({
      page: this.currentPage,
      pageSize: this.pageSize,
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getData(params: IQueryParams): void {
    this._dataService.getLaptops(params);
  }

  public onChangePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getData({ page: this.currentPage, pageSize: this.pageSize });
  }

  private _listenData(): void {
    this._dataService.dataStream$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (responce) => {
          this.data = responce.data;
          this.records = responce.paging.records;
          console.log(responce);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }


}
