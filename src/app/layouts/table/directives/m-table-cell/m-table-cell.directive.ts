import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mTableCell]',
})
export class MTableCellDirective {

  constructor(public templateRef: TemplateRef<unknown>) {}

}
