import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService, LessonService, MarathonService } from '../shared/services';

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
      private router: Router,
  		private activateRouter: ActivatedRoute,
  		private courseService: CourseService,
  		private lessonService: LessonService,
      private marathonService: MarathonService
  	) { }

  	ngOnInit() {
  		this.activateRouter.params.subscribe(params => {
      		this.lessonId = params['lesson_id'];
      		this.referenceId = params['reference_id'];

          if(this.router.url.indexOf("curso") != -1)
      		  this.getCourseById();
          else
            this.getMarathonById();
          
          if(this.lessonId != 'new')
      		  this.getLessonById();
    	});
  	}

    private getMarathonById(){
      this.marathonService.getMarathonById(this.referenceId)
      .subscribe((marathon: any) => {
        this.marathonService.setMarathonCurrent(marathon);
      });
    }

  	private getCourseById(){
  		this.courseService.getCourseById(this.referenceId)
  		.subscribe((course: any) => {
  			this.courseService.setCourseCurrent(course);
  		});
  	}

  	private getLessonById(){
  		this.lessonService.getLessonById(this.lessonId)
  		.subscribe((lesson: any) => {
  			this.lesson = lesson;
  			this.lessonService.setLessonCurrent(this.lesson);
  		});
  	}

}
