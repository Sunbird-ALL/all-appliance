import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HindiVersionComponent } from './hindi-version/hindi-version.component';
import { TamilVersionComponent } from './tamil-version/tamil-version.component';
import { AutheringLocalComponent } from './authering-local/authering-local.component';
import { AutheringServerComponent } from './authering-server/authering-server.component';
import { KannadaVersionComponent } from './kannada-version/kannada-version.component';
import { LearnerAiComponent } from './learner-ai/learner-ai.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HindiVersionComponent,
    TamilVersionComponent,
    AutheringLocalComponent,
    AutheringServerComponent,
    KannadaVersionComponent,
    LearnerAiComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
