import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Output()
  public logout = new EventEmitter();


  constructor() { }

  public ngOnInit(): void {
  }

  public onLogoutClick(): void {
    this.logout.emit();
  }

}
