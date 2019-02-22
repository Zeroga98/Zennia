import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-content-tematic',
	templateUrl: './content-tematic.component.html',
	styleUrls: ['./content-tematic.component.scss']
})
export class ContentTematicComponent implements OnInit {

	@Input('content') content: any;
	@Output('next') next = new EventEmitter();
	public froalaOptions: any = { 
		pluginsEnabled: [], 
		toolbarButtons: [], 
		events : { 'froalaEditor.initialized' : function(e, editor) { editor.edit.off(); } }
	};

	constructor() {
	}

	ngOnInit() {
	}
	
	continue(){
		this.next.emit();
	}
}
