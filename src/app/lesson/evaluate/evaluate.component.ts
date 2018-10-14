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
  public editInit: boolean = false;
	public course: any;
	public lesson: any;
	public languages = Languages.languages;
	public editorOptions;
  public submission: Submission;

  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private apiJudgeService: ApiJudgeService) { 
    this.submission = new Submission();
    this.submission.source_code = this.languages[0].code_init;
    this.submission.language_id = this.languages[0].id;
    this.editorOptions = { theme: 'vs-dark', language: this.languages[0].resume }
  }

  ngOnInit() {
    this.subscribeCourse = this.courseService.$courseCurrent.subscribe(course => this.course = course);
    this.subscribeLesson = this.lessonService.$lessonCurrent.subscribe((lesson: any) => { 
      if(lesson){
        this.lesson = lesson;
        this.submission = { ...this.submission, ...lesson.submission};
        console.log(this.submission);
      } 
    });
  }

  ngOnDestroy(){
    this.subscribeCourse.unsubscribe();
    this.subscribeLesson.unsubscribe();
  }

  ngEditInit(edit) {
    const monaco = window['monaco'];
    if (!this.editInit) {
      this.editInit = true;
      let languageRegister = [];
      this.languages.forEach((item: any) => {
        let is_register = languageRegister.find(register => { return register == item.resume });
        if(!is_register){
          languageRegister.push(item.resume);
          if(snippets[item.resume]){
            monaco.languages.registerCompletionItemProvider(item.resume, {
              provideCompletionItems: (model, position) => {
                return snippets[item.resume];
              }
            });
          }
        }
      });
    }
  }

  public sendSubmission(){
    this.apiJudgeService.submission(this.submission)
    .subscribe((data: responseSubmission) => {
      this.submission.response = data;
      console.log(this.submission.response);
      console.log(data.status);
    });
  }

  public changeLanguage(language_id: any) {
    let language = this.languages.find(item => { return item.id == language_id });
    this.submission.language_id = language_id;
    this.submission.response = undefined;
    this.submission.source_code = language.code_init;
    this.editorOptions = Object.assign({}, this.editorOptions, { language: language.resume });
  }
}
