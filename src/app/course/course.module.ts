import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';

@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule
  ],
  declarations: [CourseComponent]
})
export class CourseModule { }
