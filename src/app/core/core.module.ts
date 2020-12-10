import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AuthGuard } from '../auth/guards/auth.guard';
import { UnauthGuard } from '../auth/guards/unauth.guard';

import { DataStorageService } from './services/data-storage.service';


@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataStorageService),
  ],
  providers: [
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
