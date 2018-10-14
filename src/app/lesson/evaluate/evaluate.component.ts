import { Component, OnInit } from '@angular/core';

import * as snippets from '../../../snippets';
import { Languages } from '../../shared/constanst';
import { Submission, responseSubmission } from '../../shared/models';
import { CourseService, LessonService, ApiJudgeService } from '../../shared/services';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss']
})
export class EvaluateComponent implements OnInit {

  public subscribeCourse;
  public subscribeLesson;
  public isSubmiting: boolean = false;
  public course: any;
  public lesson: any;

  constructor(
    private courseService: CourseService,
    private lessonService: LessonService) { 
  }

  ngOnInit() {
    this.subscribeCourse = this.courseService.$courseCurrent.subscribe(course => this.course = course);
    this.subscribeLesson = this.lessonService.$lessonCurrent.subscribe((lesson: any) => this.lesson = lesson);
  }

  ngOnDestroy(){
    this.subscribeCourse.unsubscribe();
    this.subscribeLesson.unsubscribe(); 
  }
}
