import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    CarouselComponent,
  ],
  imports: [
    NgbModule,
  ],
  exports: [
    CarouselComponent,
  ],
})
export class CarouselModule { }
