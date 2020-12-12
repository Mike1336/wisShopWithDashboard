import {
  Component, Output, EventEmitter, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef 
} from '@angular/core';

import { userRole } from '../../../../auth/interfaces/user';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  @Input()
  public userRole!: userRole;

  @Input()
  public expTimeOfToken!: number;

  @Output()
  public logout = new EventEmitter();

  @Output()
  public clickToNavbar = new EventEmitter();

  public expTimer = '00:00';

  constructor(private _cdRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this._runTimer();
  }

  public emitBurgerClick(): void {
    this.clickToNavbar.emit();
  }

  public emitLogoutClick(): void {
    this.logout.emit();
  }

  private _runTimer(): void {
    let now;
    let minutes;
    let seconds;

    setInterval(() => {
      now = +(new Date().getTime());
      minutes = new Date(this.expTimeOfToken - now).getMinutes();
      seconds = new Date(this.expTimeOfToken - now).getSeconds();

      if (`${seconds}`.length === 1) {
        seconds = `0${seconds}`;
      }

      this.expTimer = `${minutes}:${seconds}`;

      this._cdRef.markForCheck();
    }, 1000);
  }

}
