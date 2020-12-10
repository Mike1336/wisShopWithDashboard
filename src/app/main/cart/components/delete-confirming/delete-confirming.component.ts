import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './delete-confirming.component.html',
  styleUrls: ['./delete-confirming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmingComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public item: {
      name: string;
    },
  ) {}

  public confirm(): boolean {
    return true;
  }

}
