import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { MarathonService, UserService, TimeService } from '../../shared/services';

@Component({
  selector: 'app-list-marathon',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMarathonComponent implements OnInit {

  public subscribeUser;
  public user: any;
  public marathons: any;
  public timeNow = this.timeService.getMomentDate();
  public difficultys: any = { facil: "Fácil", medio: "Medio", dificil: "Difícil" };

  constructor(
    public ngProgress: NgProgress,
    private marathonService: MarathonService,
    private userService: UserService,
    private timeService: TimeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscribeUser = this.userService.$userCurrent.subscribe(user => this.user = user);
    this.getListMarathons();
  }

  public getListMarathons(){
    this.marathonService.getMarathon()
    .subscribe(data => {
      data.map(item => {
        if(this.timeNow <= moment(item.fecha_final.toDate()) && this.timeNow >= moment(item.fecha_inicio.toDate()))
          item.estado = 'proceso';
        else if(this.timeNow >= moment(item.fecha_final.toDate()))
          item.estado = 'finalizado';
        else
          item.estado = 'programado';
      });
      this.marathons = data;
    });
  }
}
