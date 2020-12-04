import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { ICategoryFormat } from './../../../core/interfaces/data-formats';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.container.html',
  styleUrls: ['./catalog.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogContainer implements OnInit, OnDestroy{

  public categories: ICategoryFormat[] = [];

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(private _dataService: DataService, private _cdRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this._getCategories();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getCategories(): void {
    this._dataService.getCategories()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (data: any) => {
          if (!data.length) {
            console.error('Data is not array!');

            return;
          }
          this.categories = data;
          this._cdRef.markForCheck();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

}
