import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService, LessonService } from '../shared/services';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

	public lessonId: string;
	public referenceId: string;
	public lesson: any;

  	constructor(
  		private activateRouter: ActivatedRoute,
  		private courseService: CourseService,
  		private lessonService: LessonService
  	) { }

  	ngOnInit() {
  		this.activateRouter.params.subscribe(params => {
      		this.lessonId = params['lesson_id'];
      		this.referenceId = params['reference_id'];
      		//this.getCourseById();
          if(this.lessonId != 'new')
      		  this.getLessonById();
    	});
  	}

  	/*private getCourseById(){
  		this.courseService.getCourseById(this.referenceId)
  		.subscribe((course: any) => {
  			this.course = course;
  			this.courseService.setCourseCurrent(this.course);
  		});
  	}*/

  	private getLessonById(){
  		this.lessonService.getLessonById(this.lessonId)
  		.subscribe((lesson: any) => {
  			this.lesson = lesson;
  			this.lessonService.setLessonCurrent(this.lesson);
  		});
  	}

}
