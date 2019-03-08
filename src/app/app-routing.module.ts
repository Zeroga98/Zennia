import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './shared/services';
const routes: Routes = [ 
  {
    path: 'competir',
    loadChildren: './compete/compete.module#CompeteModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'cursos/:reference_id/leccion',
    loadChildren: './lesson/lesson.module#LessonModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'maratones/:reference_id/leccion',
    loadChildren: './lesson/lesson.module#LessonModule',
    canActivate: [AuthGuard]
  },
  /* { path: '**', redirectTo: '/curso/home' }   */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
