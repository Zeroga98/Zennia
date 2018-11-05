import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import * as snippets from '../../../snippets';
import { Languages } from '../../shared/constanst';
import { Submission, responseSubmission } from '../../shared/models';
import { CourseService, LessonService, ApiJudgeService, UserService } from '../../shared/services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  styles: ['monaco-editor { height: 500px!important; }']
})
export class CreateComponent implements OnInit {

  public form: FormGroup;
	public isSubmiting: boolean = false;
	public new_lesson: any = { submission: {} };
	public subscribeCourse;
	public subscribeUser;
	public course: any;
	public user: any;
	public monacoOptions = { theme: 'vs-dark', language: 'Text (plain text)' };
	public froalaOptions: any = {
		pluginsEnabled: ['align', 'image', 'link', 'colors', 'draggable', 'embedly', 'entities', 'fontFamily', 'fontSize', 'fullscreen', 'imageAviary', 'imageManager', 'inlineStyle','lineBreaker', 'lists', 'paragraphFormat', 'paragraphStyle', 'print', 'quickInsert', 'quote', 'specialCharacters', 'spellChecker', 'table', 'url', 'wordPaste'],
    events : { 'froalaEditor.contentChanged' : (e, editor) => this.form.controls[e.target.id].setValue(editor.html.get()) }
	};

  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private userService: UserService,
    private formBuilder: FormBuilder) { 

    this.form = this.formBuilder.group({
      'nombre': this.formBuilder.control('', [Validators.required]),
      'descripcion': this.formBuilder.control('', [Validators.required]),
      'problema': this.formBuilder.control('', [Validators.required]),
      'contenido': this.formBuilder.control('', [Validators.required]),
      'submission': this.formBuilder.group({
        'cpu_time_limit': this.formBuilder.control('', [Validators.required]),
        'stdin_real': this.formBuilder.control('', [Validators.required]),
        'expected_output': this.formBuilder.control('', [Validators.required])
      })
    });
  }

  ngOnInit() {
    this.subscribeCourse = this.courseService.$courseCurrent.subscribe(course => this.course = course);
    this.subscribeUser = this.userService.$userCurrent.subscribe(user => this.user = user);
  }

  ngOnDestroy(){
    this.subscribeCourse.unsubscribe();
    this.subscribeUser.unsubscribe();
  }

  public create(){
    if(this.form.valid && !this.isSubmiting){
      this.isSubmiting = true;
      this.lessonService.createLesson(this.form.value, this.course.id)
      .subscribe(new_lesson_id => {
        console.log(new_lesson_id);
        this.isSubmiting = false;
      });
    }
  }
}
