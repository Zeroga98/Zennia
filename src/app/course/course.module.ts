import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule
  ],
  declarations: [CourseComponent, ListComponent]
})
export class CourseModule { }
