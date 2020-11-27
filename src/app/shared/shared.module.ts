import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from './header/header.module';
import { TableModule } from './table/table.module';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    HeaderModule,
  ],
  exports: [
    TableModule,
    HeaderModule,
    CarouselComponent,
  ],
})
export class SharedModule {}
