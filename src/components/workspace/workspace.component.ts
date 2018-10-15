import { Component, OnInit, Input } from '@angular/core';

import * as snippets from '../../snippets';
import { Languages } from '../../app/shared/constanst';
import { Submission, responseSubmission } from '../../app/shared/models';
import { CourseService, LessonService, ApiJudgeService } from '../../app/shared/services';

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html',
	styleUrls: ['./workspace.component.scss'],
	styles: ['monaco-editor { height: 500px!important; }'],
})
export class WorkspaceComponent implements OnInit {

	@Input('submission') submissionExtra: any;
	public isSubmiting: boolean = false;
	public languages = Languages.languages;
	public editInit: boolean = false;
	public editorOptions;
	public submission: Submission;

	constructor(private apiJudgeService: ApiJudgeService) {
		this.submission = new Submission();
		this.submission.source_code = this.languages[0].code_init;
		this.submission.language_id = this.languages[0].id;
		this.editorOptions = { theme: 'vs-dark', language: this.languages[0].resume }
	}

	ngOnInit() {}

	ngOnDestroy() {}

	ngEditInit(edit) {
		const monaco = window['monaco'];
		if (!this.editInit) {
			this.editInit = true;
			let languageRegister = [];
			this.languages.forEach((item: any) => {
				if (!languageRegister.find(register => { return register == item.resume })) {
					languageRegister.push(item.resume);
					if (snippets[item.resume]) {
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

	public sendSubmission(type: string) {
		if (!this.isSubmiting) {
			this.isSubmiting = true;
			this.submission = { ...this.submission, ...this.submissionExtra};
			this.submission.stdin = (type == 'run') ? this.submission.test_stdin : this.submission.stdin_real;
			this.apiJudgeService.submission(this.clearSubmission())
				.subscribe((data: responseSubmission) => {
					this.submission.response = data;
					this.submission.response.typeSend = type;
					if (!this.submission.response.stdout || this.submission.response.compile_output) {
						this.submission.response.messageErrorFinal = 
							(this.submission.response.stderr) ? this.submission.response.stderr :
							(this.submission.response.message) ? this.submission.response.message : this.submission.response.compile_output;
					}

					if (type == 'send') {
						//Guardar resultado
					}
					console.log(this.submission.response);
					this.isSubmiting = false;
				});
		}
	}

	public changeLanguage(language_id: any) {
		let language = this.languages.find(item => { return item.id == language_id });
		this.submission.language_id = language_id;
		this.submission.response = undefined;
		this.submission.source_code = language.code_init;
		this.editorOptions = Object.assign({}, this.editorOptions, { language: language.resume });
	}

	private clearSubmission(){
		let clear = Object.assign({}, this.submission);	
		delete clear["test_stdin"];
		delete clear["stdin_real"];
		delete clear["response"];
		return clear;
	}
}
