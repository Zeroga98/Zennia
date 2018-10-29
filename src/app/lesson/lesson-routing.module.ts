import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonComponent } from './lesson.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [{
  path: ':lesson_id',
  component: LessonComponent,
  children: [
  	{ 
        path: 'evaluar', 
        component: EvaluateComponent,
    },
    { 
        path: 'create', 
        component: CreateComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
