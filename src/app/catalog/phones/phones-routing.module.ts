import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhonesContainer } from './containers/phones/phones.container';

const routes: Routes = [
  {
    path: '',
    component: PhonesContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhonesRoutingModule { }
