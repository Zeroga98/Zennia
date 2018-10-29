import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ArchwizardModule } from 'angular-archwizard';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { CreateComponent } from './create/create.component';
import { ComponentsModule } from '../../components';

@NgModule({
  imports: [
  	FormsModule,
  	ReactiveFormsModule,
    CommonModule,
    LessonRoutingModule,
    ComponentsModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    MonacoEditorModule.forRoot(),
    ArchwizardModule
  ],
  declarations: [LessonComponent, EvaluateComponent, CreateComponent]
})

export class LessonModule { }
