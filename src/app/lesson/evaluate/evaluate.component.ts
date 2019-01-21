import { Component, OnInit } from '@angular/core';

import * as snippets from '../../../snippets';
import { Languages } from '../../shared/constanst';
import { Submission, responseSubmission } from '../../shared/models';
import { CourseService, LessonService, ApiJudgeService, UserService, MarathonService, TimeService } from '../../shared/services';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss']
})
export class EvaluateComponent implements OnInit {

  public subscribeCourse;
  public subscribeMarathon;
  public subscribeLesson;
  public subscribeUser;
  public isSubmiting: boolean = false;
  public marathon: any;
  public course: any;
  public lesson: any;
  public user: any;
  public register_marathon: boolean;

  constructor(
    private marathonService: MarathonService,
    private courseService: CourseService,
    private lessonService: LessonService,
    private userService: UserService,
    private timeService: TimeService) { 
  }

  ngOnInit() {
    this.subscribeCourse = this.courseService.$courseCurrent.subscribe(course => this.course = course);
    this.subscribeMarathon = this.marathonService.$marathonCurrent.subscribe(marathon => {
      this.marathon = marathon;
      if(this.marathon){
        this.register_marathon = this.marathon.inscritos.find(item => { return item.user_id == this.userService.getUserId() }) != undefined;
        this.marathon.estado = this.marathonService.stateMarathon(marathon);
      }
    });
    this.subscribeLesson = this.lessonService.$lessonCurrent.subscribe((lesson: any) => {
      this.lesson = lesson
    });
    this.subscribeUser = this.userService.$userCurrent.subscribe(user => this.user = user);
  }

  ngOnDestroy(){
    this.subscribeCourse.unsubscribe();
    this.subscribeLesson.unsubscribe(); 
    this.subscribeUser.unsubscribe();
    this.subscribeMarathon.unsubscribe();
    this.courseService.setCourseCurrent(undefined);
    this.marathonService.setMarathonCurrent(undefined);
  }

  public sendProblem(event){
    let submission = {
      status: event.status.description,
      time: event.time,
      fecha_registro: this.timeService.getDate()
    };
    this.lessonService.saveResult(this.user.id, this.lesson.id, submission)
    .subscribe(data => {
      console.log(data);
    });
  }
}
