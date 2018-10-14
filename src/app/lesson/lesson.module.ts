import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { ComponentsModule } from '../../components';

@NgModule({
  imports: [
  	FormsModule,
  	ReactiveFormsModule,
    CommonModule,
    LessonRoutingModule,
    ComponentsModule
  ],
  declarations: [LessonComponent, EvaluateComponent]
})

export class LessonModule { }
