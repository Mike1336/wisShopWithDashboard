import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginContainer } from './containers/login/login.container';


@NgModule({
  declarations: [
    LoginComponent,
    LoginContainer,
  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Own
    AuthRoutingModule,
  ],
})
export class AuthModule { }
