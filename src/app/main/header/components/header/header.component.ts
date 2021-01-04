import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

import { userRole } from '../../../../auth/interfaces/auth';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  @Input()
  public userRole!: userRole;

  @Input()
  public cartLength!: number;

  @Input()
  public wishlisthLength!: number;

  @Input()
  public searchIsShow!: boolean;

  @Output()
  public logout = new EventEmitter();

  @Output()
  public clickToNavbar = new EventEmitter();

  constructor() { }

  public emitBurgerClick(): void {
    this.clickToNavbar.emit();
  }

  public emitLogoutClick(): void {
    this.logout.emit();
  }

}
