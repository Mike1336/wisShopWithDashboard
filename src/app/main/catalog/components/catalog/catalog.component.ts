import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

import { DataService } from '../../../../core/services/data.service';
@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CatalogComponent implements OnInit, OnDestroy {

  public currentCategory = '';

  public currentPageOfCategory = 1;

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public get loadingStatus$(): Observable<boolean> {
    return this._dataService.loadingStatus$;
  }

  public ngOnInit(): void {
    this._getCategoryFromParams();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getCategoryFromParams(): void {
    this._route.params
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (params) => {
          this._dataService.startLoading();
          this.currentCategory = params.category;
          this.currentPageOfCategory = +params.page;
          this._cdRef.markForCheck();
        },
      );
  }

}
