import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NgProgressModule } from 'ngx-progressbar';
import {
  HeaderComponent
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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



