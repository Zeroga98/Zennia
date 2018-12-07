import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { MarathonService } from '../../shared/services';

@Component({
  selector: 'app-marathon-profile',
  templateUrl: './marathon-profile.component.html',
  styleUrls: ['./marathon-profile.component.scss']
})
export class MarathonProfileComponent implements OnInit {

	public marathonId: string;
	public marathon: any;

  	constructor(
	  	private router: Router,
	  	private activateRouter: ActivatedRoute,
	  	private toast: ToastrService,
	  	private marathonService: MarathonService) { }

  	ngOnInit() {
  		this.activateRouter.params.subscribe(params => {
  			this.marathonId = params['marathon_id'];
  			this.getMarathonById();
  		});
  	}

  	public getMarathonById(){
  		this.marathonService.getMarathonById(this.marathonId)
  		.subscribe(data => {
  			this.marathon = data;
  			console.log(data);
  		});
  	}

}
