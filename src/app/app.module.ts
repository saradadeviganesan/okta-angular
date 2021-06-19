import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { LoginComponent } from './login/login.component';

import config from './app.config';

import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    LeftMenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    HttpClientModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: config.oidc }],
  bootstrap: [AppComponent]
})
export class AppModule { }
