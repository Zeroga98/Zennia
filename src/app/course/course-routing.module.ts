import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: CourseComponent,
  children: [
  	{ 
        path: 'home', 
        component: ListComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
