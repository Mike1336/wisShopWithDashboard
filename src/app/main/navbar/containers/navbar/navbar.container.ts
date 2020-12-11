import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { MatDrawer } from '@angular/material/sidenav';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavbarService } from '../../services/navbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.container.html',
  styleUrls: ['./navbar.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarContainer implements OnInit, OnDestroy {

  @ViewChild(MatDrawer, { static: true })
  public drawer!: MatDrawer;

  private _destroy$ = new ReplaySubject<void>(1);

  constructor(private _navbarService: NavbarService, private _cdRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this._listenNavStatus();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public hideDrawer(): void {
    this._navbarService.setStatus(false);
  }

  private _listenNavStatus(): void {
    this._navbarService.status$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (data) => {
          data
          ? this.drawer.open()
          : this.drawer.close();

          this._cdRef.markForCheck();
        });
  }

}
