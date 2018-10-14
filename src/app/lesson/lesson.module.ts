import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  imports: [
  	FormsModule,
  	ReactiveFormsModule,
    CommonModule,
    LessonRoutingModule,
    MonacoEditorModule.forRoot()
  ],
  declarations: [LessonComponent, EvaluateComponent]
})

export class LessonModule { }
