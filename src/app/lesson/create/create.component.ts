import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
	public subscribeCourse;
	public subscribeUser;
  public monacoOptions = { theme: 'vs-dark', language: 'Text (plain text)' };
  public froalaOptions: any = {
    pluginsEnabled: ['align', 'image', 'link', 'colors', 'draggable', 'embedly', 'entities', 'fontFamily', 'fontSize', 'fullscreen', 'imageAviary', 'imageManager', 'inlineStyle','lineBreaker', 'lists', 'paragraphFormat', 'paragraphStyle', 'print', 'quickInsert', 'quote', 'specialCharacters', 'spellChecker', 'table', 'url', 'wordPaste'],
    events : { 'froalaEditor.contentChanged' : (e, editor) => this.form.controls[e.target.id].setValue(editor.html.get()) }
  };

  public new_lesson: any = { submission: {} };
  public lessonId: string;
	public course: any;
	public user: any;

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private lessonService: LessonService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toast: ToastrService) { 

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
    this.activateRouter.parent.params.subscribe(params => {
        this.lessonId = params['lesson_id'];
        if(this.lessonId != 'new'){
          this.lessonService.getLessonById(this.lessonId)
          .subscribe(data => {
             this.new_lesson.problema = data.problema;
             this.new_lesson.contenido = data.contenido;
            this.form.patchValue(data);
          });
        }
    });
  }

  ngOnDestroy(){
    this.subscribeCourse.unsubscribe();
    this.subscribeUser.unsubscribe();
  }

  public create(){
    this.lessonService.createLesson(this.form.value, this.course.id)
    .subscribe(new_lesson_id => {
      this.router.navigate(['/curso', this.course.id, 'leccion', new_lesson_id, 'admin']);
      this.isSubmiting = false;
    });
  }

  public update(){
    this.lessonService.updateLesson(this.form.value, this.lessonId)
    .subscribe(data => {
      this.toast.success('Actualización exitosa!', 'Bien!', {
        timeOut: 2000,
        positionClass:'toast-bottom-right'
      });
      this.isSubmiting = false;
    });
  }

  public action(){
    if(this.form.valid && !this.isSubmiting){
      this.isSubmiting = true;
      if(this.lessonId != 'new')
        this.update();
      else
        this.create();
    }
  }
}
