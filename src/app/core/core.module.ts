import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from '../dashboard/guards/auth.guard';

import { UnauthGuard } from './../dashboard/guards/unauth.guard';
import { AuthModule } from './../auth/auth.module';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
  ],
  providers: [
    AuthModule,
    AuthGuard,
    UnauthGuard,
  ],
})
export class CoreModule {

  constructor(
    @Optional()
    @SkipSelf()
    @Inject(CoreModule)
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been existing!',
      );
    }
  }

}
