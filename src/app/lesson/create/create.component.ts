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
  styleUrls: ['./create.component.scss']
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

  public new_lesson: any = { submission: {}, problema: `<h1>Titulo del problema</h1><p>Descripción del problema.</p><p>Otra descripción.</p><h2>Input</h2><p>Descripción de la entrada.</p><h2>Output</h2><p>Descripción de la salida</p><table style="margin-right: calc(16%); width: 84%;"><thead><tr><td style="width: 43.5701%;">Input Sample</td><td style="width: 56.238%;">Output Sample</td></tr></thead><tbody><tr><td style="width: 43.5701%;"><p>Variable 1<br>Variable 2<br>Variable 3</p></td><td style="width: 56.238%;"><p>Output 1<br>Output 2<br>Output 3</p></td></tr></tbody></table>`};
  public lessonId: string;
	public user: any;
  public type: string;
  public referenceId: string;

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
      'contenido': this.formBuilder.control('', (this.type == 'cursos')? [Validators.required]: []),
      'oculta': this.formBuilder.control(false, [Validators.required]),
      'submission': this.formBuilder.group({
        'cpu_time_limit': this.formBuilder.control('', [Validators.required]),
        'stdin_real': this.formBuilder.control('', [Validators.required]),
        'expected_output': this.formBuilder.control('', [Validators.required])
      })
    });
  }

  ngOnInit() {
    this.subscribeUser = this.userService.$userCurrent.subscribe(user => this.user = user);
    this.activateRouter.parent.params.subscribe(params => {
        this.type = (this.router.url.indexOf("curso") != -1)? 'cursos' : 'maratones';
        this.lessonId = params['lesson_id'];
        this.referenceId = params['reference_id'];

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
    this.subscribeUser.unsubscribe();
  }

  public create(){
    this.lessonService.createLesson(this.form.value, this.referenceId, this.type)
    .subscribe(new_lesson_id => {
      if(this.type == 'cursos')
        this.router.navigate([this.type, this.referenceId, 'leccion', new_lesson_id, 'admin']);
      else
        this.router.navigate(['/competir/maraton/admin', this.referenceId]);
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

  public hideLesson(){
    this.lessonService.hideLesson(this.lessonId, !this.form.controls.oculta.value)
    .then(data => {
      this.form.controls.oculta.setValue(!this.form.controls.oculta.value);
    });
  }
}
