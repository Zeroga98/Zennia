import { Component, OnInit, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as snippets from '../../snippets';
import { Languages } from '../../app/shared/constanst';
import { Submission, responseSubmission } from '../../app/shared/models';
import { CourseService, LessonService, ApiJudgeService } from '../../app/shared/services';
import { ModalAdviseResultComponent } from '../modal-advise-result/modal-advise-result.component';
import { Router, NavigationStart } from '@angular/router';

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html',
	styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

	@Input('submission') submissionExtra: any;
	@Input('content-problem') contentProblem: any;
	@Input('hide-code') hideCode: any;
	@Output('send-problem') sendProblem = new EventEmitter();
	public isSubmiting: boolean = false;
	public languages = Languages.languages;
	public editInit: boolean = false;
	public monacoOptions;
	public submission: Submission;
	public loading: boolean = false;
	public froalaOptions: any = {
		pluginsEnabled: [],
		toolbarButtons: [],
		events: { 'froalaEditor.initialized': function (e, editor) { editor.edit.off(); } }
	};
	bsModalRef: BsModalRef;

	constructor(
		private apiJudgeService: ApiJudgeService,
		private lessonService: LessonService,
		private modalService: BsModalService,
		private router:Router) {
		this.submission = new Submission();
		this.submission.source_code = this.languages[0].code_init;
		this.submission.language_id = this.languages[0].id;
		this.monacoOptions = { theme: 'vs-dark', language: this.languages[0].resume }
	
	}

	ngOnInit() {

	}

	ngOnDestroy() { }

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
							provideCompletionItems: (model, position) => snippets[item.resume]
						});
					}
				}
			});
		}
	}

	public sendSubmission(type: string) {
		this.loading = type == 'run' ? true : false;
		if (!this.isSubmiting) {
			this.isSubmiting = true;
			this.submission = { ...this.submission, ...this.submissionExtra };
			this.submission.stdin = (type == 'run') ? this.submission.test_stdin : this.submission.stdin_real;
			this.apiJudgeService.submission(this.clearSubmission())
				.subscribe((data: responseSubmission) => {
					this.submission.response = data;
					this.submission.response.typeSend = type;

					if (!this.submission.response.stdout || this.submission.response.compile_output) {
						this.submission.response.messageErrorFinal =
							(this.submission.response.stderr) ? this.submission.response.stderr :
								(this.submission.response.message) ? this.submission.response.message : this.submission.response.compile_output;
						if(type == 'run'){
							let outputTextArea: any = document.getElementById("output");
							outputTextArea.value = this.submission.response.messageErrorFinal;
						}
					} else if(type == 'run'){
						let outputTextArea: any = document.getElementById("output");
						outputTextArea.value = this.submission.response.stderr || this.submission.response.stdout;
					}

					if (type == 'send'){
						this.sendProblem.emit(this.submission.response);
						const initialState = { states: [ this.submission.response.status ] };
						this.bsModalRef = this.modalService.show(ModalAdviseResultComponent, { initialState });
						this.bsModalRef.content.closeBtnName = 'Close';
					}

					this.isSubmiting = false;
					this.loading = false;
				});
		}
	}

	public changeLanguage(language_id: any) {
		let language = this.languages.find(item => item.id == language_id);
		this.submission.language_id = language_id;
		this.submission.response = undefined;
		this.submission.source_code = language.code_init;
		this.monacoOptions = Object.assign({}, this.monacoOptions, { language: language.resume });
	}

	private clearSubmission() {
		let clear = Object.assign({}, this.submission);
		delete clear["test_stdin"];
		delete clear["stdin_real"];
		delete clear["response"];
		return clear;
	}

}
