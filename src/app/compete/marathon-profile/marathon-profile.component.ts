import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { MarathonService, UserService } from '../../shared/services';

@Component({
  selector: 'app-marathon-profile',
  templateUrl: './marathon-profile.component.html',
  styleUrls: ['./marathon-profile.component.scss']
})
export class MarathonProfileComponent implements OnInit {

  	public user_id: string;
	public marathonId: string;
	public marathon: any;
  	public register_marathon: boolean;

  constructor(
  	private router: Router,
  	private activateRouter: ActivatedRoute,
  	private toast: ToastrService,
  	private marathonService: MarathonService,
    private userService: UserService) { }

	ngOnInit() {
    	this.user_id = this.userService.getUserId();
		this.activateRouter.params.subscribe(params => {
			this.marathonId = params['marathon_id'];
			this.getMarathonById();
		});
	}

	public getMarathonById(){
		this.marathonService.getMarathonById(this.marathonId, false)
		.subscribe(data => { 
			this.marathon = data;
      		this.register_marathon = this.marathon.inscritos.find(item => { return item.user_id == this.user_id }) != undefined;
      		this.marathon.estado = this.marathonService.stateMarathon(this.marathon);
			console.log(this.marathon);
		});
	}

}
