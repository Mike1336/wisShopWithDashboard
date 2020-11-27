import { ContentChild, Directive } from '@angular/core';

import { MTableColumnTitleDirective } from '../m-table-column-title/m-table-column-title.directive';
import { MTableCellDirective } from '../m-table-cell/m-table-cell.directive';

@Directive({
  selector: 'm-table-column',
})
export class MTableColumnDirective {

  @ContentChild(MTableColumnTitleDirective)
  public columnTitle!: MTableColumnTitleDirective;

  @ContentChild(MTableCellDirective)
  public tableRow!: MTableCellDirective;

  constructor() { }

  public get templateRef(): any {
    return this.tableRow.templateRef;
  }

  public get titleContent(): any {
    return this.columnTitle?.templateRef;
  }

  public get sort(): boolean {
    return this.columnTitle?.sort;
  }

  public get title(): string {
    return this.columnTitle?.value;
  }

}
