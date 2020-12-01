import { NgModule } from '@angular/core';

import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    CarouselComponent,
  ],
  exports: [
    CarouselComponent,
  ],
})
export class CarouselModule { }
