import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MarathonService, TimeService } from '../../shared/services';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

	public marathonId: string;
	public marathon: any;

  	constructor(
  		private router: Router,
  		private activateRouter: ActivatedRoute,
  		private marathonService: MarathonService
  	) { }

  	ngOnInit() {
  		this.activateRouter.params.subscribe(params => {
			this.marathonId = params['marathon_id'];
			this.getLeaderBoard();
		});
  	}

  	public getLeaderBoard(){
  		this.marathonService.getLeaderboard(this.marathonId)
  		.subscribe(data => {
  			this.marathon = data;
  			console.log(this.marathon);
  		});
  	}

}
