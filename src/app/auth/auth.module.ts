import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgProgressModule
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule { }
