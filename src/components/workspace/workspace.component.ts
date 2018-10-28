import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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
	@Input('content-problem') contentProblem: any;
	@Output('send-problem') sendProblem = new EventEmitter();
	public isSubmiting: boolean = false;
	public languages = Languages.languages;
	public editInit: boolean = false;
	public monacoOptions;
	public submission: Submission;
	public froalaOptions: any = { 
		pluginsEnabled: [], 
		toolbarButtons: [], 
		events : { 'froalaEditor.initialized' : function(e, editor) { editor.edit.off(); } }
	};

	constructor(private apiJudgeService: ApiJudgeService, private lessonService: LessonService) {
		this.submission = new Submission();
		this.submission.source_code = this.languages[0].code_init;
		this.submission.language_id = this.languages[0].id;
		this.monacoOptions = { theme: 'vs-dark', language: this.languages[0].resume }
	}

	ngOnInit() {
	}

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
					if (type == 'send')
						this.sendProblem.emit(this.submission.response);

					this.isSubmiting = false;
				});
		}
	}

	public changeLanguage(language_id: any) {
		let language = this.languages.find(item => { return item.id == language_id });
		this.submission.language_id = language_id;
		this.submission.response = undefined;
		this.submission.source_code = language.code_init;
		this.monacoOptions = Object.assign({}, this.monacoOptions, { language: language.resume });
	}

	private clearSubmission(){
		let clear = Object.assign({}, this.submission);	
		delete clear["test_stdin"];
		delete clear["stdin_real"];
		delete clear["response"];
		return clear;
	}
}

/*
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner tec = new Scanner(System.in);
        int cases = tec.nextInt();
        for(int i = 0; i < cases; i++){
            int x = tec.nextInt();
            int total = 0;
            for(int j = 0; j < x; j++){
                total += (j + 1);
                if(total == x){
                    System.out.println(x + " eh perfeito");
                    break;
                } else if(total > x){
                    System.out.println(x + " nao eh perfeito");
                    break;
                }
            }
        }
    }
}
*/
