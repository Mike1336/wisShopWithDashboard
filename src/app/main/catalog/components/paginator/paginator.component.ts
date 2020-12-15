import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {

  public pages: number[] = [];

  @Input()
  public collectionSize = 1;

  @Input()
  public page = 1;

  @Input()
  public pageSize = 1;

  @Output()
  public pageChange = new EventEmitter<number>();

  constructor(private _cdRef: ChangeDetectorRef) { }

  public ngOnChanges(): void {
    const pages = Math.ceil(this.collectionSize / this.pageSize);

    this.pages = [];

    for (let i = 0; i < pages; i++) {
      this.pages.push(i + 1);
    }

    this._cdRef.markForCheck();
  }

  public emitPageChange(value: number): void {
    this.pageChange.emit(value);
  }

}
