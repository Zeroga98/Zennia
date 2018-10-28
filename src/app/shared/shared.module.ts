import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedRoutingModule } from './shared-routing.module';
import { AuthService, ApiService, CourseService, LessonService, ApiJudgeService, UserService } from './services';
import { ReversePipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule
  ],
  declarations: [
  	ReversePipe
  ],
  providers: [ 
  	AuthService, 
  	ApiService, 
  	CourseService, 
  	LessonService, 
  	ApiJudgeService,
    UserService
  ]
})
export class SharedModule { }
