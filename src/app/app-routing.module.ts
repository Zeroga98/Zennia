import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [ 
  {
    path: 'competir',
    loadChildren: './compete/compete.module#CompeteModule'
  },
  {
    path: 'curso',
    loadChildren: './course/course.module#CourseModule'
  },
  {
    path: 'curso/:course_id/leccion',
    loadChildren: './lesson/lesson.module#LessonModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
