import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NgProgressModule } from 'ngx-progressbar';
import { HeaderComponent } from './shared';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    NgProgressModule,
    BsDropdownModule.forRoot(),
    MonacoEditorModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }



