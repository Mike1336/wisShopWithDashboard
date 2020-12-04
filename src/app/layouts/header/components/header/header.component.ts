import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

import { userRole } from './../../../../auth/interfaces/user';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  @Input()
  public userRole!: userRole;

  @Output()
  public logout = new EventEmitter();

  constructor() { }

  public onLogoutClick(): void {
    this.logout.emit();
  }

}
