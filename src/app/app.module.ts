import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NgProgressModule } from 'ngx-progressbar';
import {
  HeaderComponent,
  SharedModule
} from './shared';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    HomeModule,
    NgProgressModule,
    BsDropdownModule.forRoot(),
    AngularFontAwesomeModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }



