import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedRoutingModule } from './shared-routing.module';
import { ShowAuthedDirective } from './show-authed.directive';
import { 
  AuthService, 
  ApiService, 
  CourseService, 
  LessonService, 
  ApiJudgeService, 
  UserService, 
  MarathonService,
  TimeService,
  TokenService,
  AuthGuard,
} from './services';
import { ReversePipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    ReversePipe,
    ShowAuthedDirective
  ],
  providers: [ 
  	AuthService, 
  	ApiService, 
    TimeService,
  	CourseService, 
  	LessonService, 
  	ApiJudgeService,
    UserService,
    MarathonService,
    TokenService,
    AuthGuard,
  ],
  exports:[
    ShowAuthedDirective
  ]
})
export class SharedModule { }
