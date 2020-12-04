import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { IProductDataFormat } from '../../../core/interfaces/data-formats';

@Component({
  selector: 'category-content',
  templateUrl: './category-content.container.html',
  styleUrls: ['./category-content.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryContentContainer implements OnInit, OnChanges, OnDestroy {

  @Input()
  public category = '';

  public records = 0;
  public currentPage = 1;
  public pageSize = 5;

  public data: IProductDataFormat[] = [];

  private _destroy$ = new ReplaySubject<void>();

  constructor(private _dataService: DataService, private _cdRef: ChangeDetectorRef) { }

  public get loadingStatus$(): Observable<boolean> {
    return this._dataService.loadingStatus$;
  }

  public ngOnInit(): void {
    this._listenData();
  }

  public ngOnChanges(): void {
    this.getData(this.category);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getData(category: string): void {
    this._dataService.getData(category, { page: this.currentPage, pageSize: this.pageSize });
  }

  public onChangePage(): void {
    this._dataService.startLoading();
    this.getData(this.category);
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
          this._cdRef.markForCheck();
          this._dataService.stopLoading();
        },
        error: (error) => {
          console.error(error);
          this._dataService.stopLoading();
        },
      });
  }

}
