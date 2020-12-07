import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NavbarContainer } from './containers/navbar/navbar.container';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarService } from './services/navbar.service';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarContainer,
  ],
  imports: [
    // Angular
    RouterModule,
    // Angular Material
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
  ],
  exports: [
    NavbarComponent,
    NavbarContainer,
  ],
})
export class NavbarModule {

}
