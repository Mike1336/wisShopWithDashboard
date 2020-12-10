import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {

  @Output()
  public selectCategory = new EventEmitter();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public emitCategoryClick(): void {
    this.selectCategory.emit();
  }

}
