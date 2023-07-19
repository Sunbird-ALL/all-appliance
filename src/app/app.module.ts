import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HindiVersionComponent } from './hindi-version/hindi-version.component';
import { TamilVersionComponent } from './tamil-version/tamil-version.component';
import { AutheringLocalComponent } from './authering-local/authering-local.component';
import { AutheringServerComponent } from './authering-server/authering-server.component';

@NgModule({
  declarations: [
    AppComponent,
    HindiVersionComponent,
    TamilVersionComponent,
    AutheringLocalComponent,
    AutheringServerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
