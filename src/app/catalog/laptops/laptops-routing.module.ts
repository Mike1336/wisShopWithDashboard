import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaptopsContainer } from './containers/laptops/laptops.container';

const routes: Routes = [
  {
    path: '',
    component: LaptopsContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaptopsRoutingModule { }
