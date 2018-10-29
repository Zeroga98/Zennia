import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NgProgressModule } from 'ngx-progressbar';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgProgressModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule { }
