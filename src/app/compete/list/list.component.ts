import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

import { MarathonService, UserService, TimeService } from '../../shared/services';

@Component({
  selector: 'app-list-marathon',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMarathonComponent implements OnInit {

  public subscribeUser;
  public user_id = this.userService.getUserId();
  public user: any;
  public marathons: any;
  public difficultys: any = { facil: "Fácil", medio: "Medio", dificil: "Difícil" };

  constructor(
    public ngProgress: NgProgress,
    private marathonService: MarathonService,
    private userService: UserService,
    private timeService: TimeService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.subscribeUser = this.userService.$userCurrent.subscribe(user => this.user = user);
    this.getListMarathons();
  }

  public getListMarathons(){
    this.marathonService.getMarathon()
    .subscribe(data => {
      data.map(item => {
        let register_exist = item.inscritos.find(item => { return item.user_id == this.user_id });

        if(this.timeService.getMomentDate() <= moment(item.fecha_final.toDate()) && this.timeService.getMomentDate() >= moment(item.fecha_inicio.toDate()))
          item.estado = 'proceso';
        else if(this.timeService.getMomentDate() >= moment(item.fecha_final.toDate()))
          item.estado = 'finalizado';
        else if(register_exist)
          item.estado = 'inscrito';
        else
          item.estado = 'programado';
      });
      this.marathons = data;
    });
  }

  public registerMarathon(marathon){
    if(this.timeService.getMomentDate() < moment(marathon.fecha_inicio.toDate())){
      let exist = marathon.inscritos.find(item => { return item.user_id == this.user_id });

      if(!exist)
        this.registerMarathonFirebase(this.user_id, marathon);
      else
        this.toast.info(
          `Inscrito desde ${ moment(exist.fecha.toDate()).format('DD-MM-YYYY kk:mm') }.`, 
          'Ya estas inscrito', 
          { timeOut: 3000, positionClass:'toast-bottom-right'});  

    } else
      this.toast.info(
        `Solo puedes inscribirte antes de la competencia.`, 
        'No es posible inscribirse', 
        { timeOut: 3000, positionClass:'toast-bottom-right'});
  }

  private registerMarathonFirebase(user_id, marathon){
    this.marathonService.updateMarathon({
      inscritos: [ { user_id: user_id, fecha: this.timeService.getDate() }, ...marathon.inscritos ]
    }, marathon.id)
    .subscribe(data => {
      marathon.estado = 'inscrito';
      marathon.inscritos = [ { user_id: user_id, fecha: this.timeService.getMomentDate() }, ...marathon.inscritos ];
    });
  }
}
