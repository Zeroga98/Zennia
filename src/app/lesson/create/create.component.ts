import { Component, OnInit } from '@angular/core';

import * as snippets from '../../../snippets';
import { Languages } from '../../shared/constanst';
import { Submission, responseSubmission } from '../../shared/models';
import { CourseService, LessonService, ApiJudgeService, UserService } from '../../shared/services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

	public isSubmiting: boolean = false;
	public new_lesson: any = { submission: {} };
	public subscribeCourse;
	public subscribeUser;
	public course: any;
	public user: any;
	public monacoOptions = { theme: 'vs-dark', language: 'Text (plain text)' };
	public froalaOptions: any = {
		pluginsEnabled: ['align', 'image', 'link', 'colors', 'draggable', 'embedly', 'entities', 'fontFamily', 'fontSize', 'fullscreen', 'imageAviary', 'imageManager', 'inlineStyle','lineBreaker', 'lists', 'paragraphFormat', 'paragraphStyle', 'print', 'quickInsert', 'quote', 'specialCharacters', 'spellChecker', 'table', 'url', 'wordPaste']
	};

  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private userService: UserService) { 
  }

  ngOnInit() {
    this.subscribeCourse = this.courseService.$courseCurrent.subscribe(course => this.course = course);
    this.subscribeUser = this.userService.$userCurrent.subscribe(user => this.user = user);
  }

  ngOnDestroy(){
    this.subscribeCourse.unsubscribe();
    this.subscribeUser.unsubscribe();
  }
}
