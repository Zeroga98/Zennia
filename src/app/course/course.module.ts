import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    CourseRoutingModule
  ],
  declarations: [CourseComponent, ListComponent]
})
export class CourseModule { }
