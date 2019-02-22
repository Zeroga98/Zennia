import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

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
  TokenService
} from './services';
import { ReversePipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
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
    TokenService
  ],
  exports:[
    ShowAuthedDirective
  ]
})
export class SharedModule { }
