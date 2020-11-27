import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../../dashboard/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.container.html',
  styleUrls: ['./header.container.scss']
})
export class HeaderContainer implements OnInit {

  constructor(private _auth: AuthService) { }

  public ngOnInit(): void {
  }

  public logout(): void {
    this._auth.logout();
  }

}
