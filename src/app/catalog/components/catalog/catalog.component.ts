import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnChanges } from '@angular/core';

import { pluck, takeUntil, debounceTime, tap } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

import { DataService } from '../../services/data.service';

import { ICategoryFormat } from './../../../core/interfaces/data-formats';
@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CatalogComponent implements OnChanges, OnDestroy {

  @Input()
  public categories: ICategoryFormat[] = [];

  public currentCategory = '';

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    ) { }

  public get loadingStatus$(): Observable<boolean> {
    return this._dataService.loadingStatus$;
  }

  public ngOnChanges(): void {
    this._getCategoryFromParams();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getCategoryFromParams(): void {
    this._route.params
      .pipe(
        debounceTime(500),
        pluck('category'),
        takeUntil(this._destroy$),
      )
      .subscribe(
        (param: string) => {
          if (this.currentCategory === param) {
            return;
          }
          this._dataService.startLoading();
          this.currentCategory = this._getCorrectCategory(param);
        },
      );
  }

  private _getCorrectCategory(categoryFromParam: string): string {
    const selectedCategory = this.categories
      .map((category) => category.name.toLowerCase())
      .find((category) => category === categoryFromParam);

    return selectedCategory ?? this.currentCategory;
  }

}
