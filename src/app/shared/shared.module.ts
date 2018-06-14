import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './layout/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  declarations: [HeaderComponent]
})
export class SharedModule { }
