import { AfterViewInit, Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit {

  constructor(private _route: ActivatedRoute) { }

  public ngAfterViewInit(): void {
    this._route.url.subscribe(console.log)
  }

}
