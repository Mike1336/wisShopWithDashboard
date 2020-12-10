import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './components/preview/preview.component';


@NgModule({
  declarations: [
    PreviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PreviewRoutingModule,
  ],
})
export class PreviewModule { }
