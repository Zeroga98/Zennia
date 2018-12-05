import { Component, OnInit } from '@angular/core';

import * as snippets from '../../../snippets';
import { Languages } from '../../shared/constanst';
import { Submission, responseSubmission } from '../../shared/models';
import { CourseService, LessonService, ApiJudgeService, UserService } from '../../shared/services';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss']
})
export class EvaluateComponent implements OnInit {

  public subscribeCourse;
  public subscribeLesson;
  public subscribeUser;
  public isSubmiting: boolean = false;
  //public course: any;
  public lesson: any;
  public user: any;

  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private userService: UserService) { 
  }

  ngOnInit() {
    //this.subscribeCourse = this.courseService.$courseCurrent.subscribe(course => this.course = course);
    this.subscribeLesson = this.lessonService.$lessonCurrent.subscribe((lesson: any) => this.lesson = lesson);
    this.subscribeUser = this.userService.$userCurrent.subscribe(user => this.user = user);
  }

  ngOnDestroy(){
    //this.subscribeCourse.unsubscribe();
    this.subscribeLesson.unsubscribe(); 
    this.subscribeUser.unsubscribe();
  }

  public sendProblem(event){
    let submission = {
      status: event.status.description,
      time: event.time
    };
    this.lessonService.saveResult(this.user.id, this.lesson.id, submission)
    .subscribe(data => {
      console.log(data);
    });
  }
}
