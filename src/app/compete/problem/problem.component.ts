import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

	public marathon_id: string;

  	constructor(
  		private activateRouter: ActivatedRoute
  	) {
  		this.activateRouter.parent.params.subscribe(params => {
        	this.marathon_id = params['marathon_id'];
    	});
  	}

  	ngOnInit() {
  	}

}
