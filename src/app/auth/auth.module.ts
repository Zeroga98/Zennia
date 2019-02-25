import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NgProgressModule } from 'ngx-progressbar';
import { SharedModule } from '../shared';
import { NgxLoadingModule } from 'ngx-loading';
import { NoAuthGuard } from './no-auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgProgressModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule { }
