import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabletsContainer } from './containers/tablets/tablets.container';

const routes: Routes = [
  {
    path: '',
    component: TabletsContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabletsRoutingModule { }
