import { NgModule } from '@angular/core';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { SharedModule } from './shared/shared.module';
import { HeaderModule } from './layouts/header/header.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataStorageService } from './core/services/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientInMemoryWebApiModule.forRoot(DataStorageService),
    CoreModule,
    AppRoutingModule,
    HeaderModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
