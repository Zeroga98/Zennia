import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';

import { MarathonService, UserService } from '../shared/services';

@Component({
  selector: 'app-compete',
  templateUrl: './compete.component.html',
  styleUrls: ['./compete.component.scss']
})
export class CompeteComponent implements OnInit {

  public subscribeUser;
  public user: any;
  public marathons: any;

  constructor(
    public ngProgress: NgProgress,
    private marathonService: MarathonService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscribeUser = this.userService.$userCurrent.subscribe(user => this.user = user);
    this.getListMarathons();
    /*this.ngProgress.start();

    setTimeout(() => {
         this.ngProgress.done();
     }, 1000); */
  }

  public getListMarathons(){
    this.marathonService.getMarathon()
    .subscribe(data => {
      console.log(data);
      this.marathons = data;
    });
  }
}
