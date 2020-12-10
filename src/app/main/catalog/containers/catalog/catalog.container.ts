import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.container.html',
  styleUrls: ['./catalog.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogContainer {

  constructor() { }

}
