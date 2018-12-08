import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest, defer, Observable, Observer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as moment from 'moment';

import { ApiService } from './api.service';
import { UserService } from './user.service';
import { TimeService } from './time.service';

@Injectable()
export class MarathonService {

    private marathonCurrent: Subject<any> = new BehaviorSubject<any>(null);
    public $marathonCurrent = this.marathonCurrent.asObservable();

    constructor(
        private api: ApiService,
        private firestore: AngularFirestore,
        private userService: UserService,
        private timeService: TimeService
    ) { }

    public getMarathon(): Observable<any>{
    	return new Observable((observer) => {
	    	this.firestore.collection(`maratones`).ref.get()
	    	.then(async (marathons: any) => {
	    		let data_parser = [];
                let user_rol = await this.userService.getUserRol().toPromise();
	    		marathons.docs.map(item => {
                    if(!item.data().oculta || user_rol == 'ADMIN')
                        data_parser.push({ 
                            id: item.id, 
                            ...item.data(), 
                            fecha_inicio_parse: item.data().fecha_inicio.toDate(), 
                            fecha_final_parse: item.data().fecha_final.toDate() 
                        });
                });
			    observer.next(data_parser);
			    observer.complete();
	    	});
    	});
    }

    public getMarathonById(id: string, format_timestamp_separated: boolean): Observable<any>{
        return new Observable((observer) => {
            this.firestore.doc(`maratones/${ id }`).snapshotChanges()
            .subscribe((marathon: any) => {
                let lessons = [];
                marathon.payload.data().lecciones.map(async (lec: any) => {
                      let res = await lec.get();
                      let user_id = this.userService.getUserId();
                      let user_results = await this.firestore.doc(`resultado_lecciones/${ user_id }-${ res.id }`).ref.get();
                      lessons.push({ id: res.id, ...res.data(), results: user_results.data() });
                });
                if(format_timestamp_separated)
                    observer.next({ 
                        id: marathon.payload.id, 
                        ...marathon.payload.data(), 
                        fecha_inicio: moment(marathon.payload.data().fecha_inicio.toDate()).format('YYYY-MM-DD'), 
                        hora_inicio: moment(marathon.payload.data().fecha_inicio.toDate()).format('kk:mm'), 
                        fecha_final: moment(marathon.payload.data().fecha_final.toDate()).format('YYYY-MM-DD'), 
                        hora_final: moment(marathon.payload.data().fecha_final.toDate()).format('kk:mm'), 
                        lecciones: lessons 
                    });
                else
                    observer.next({ 
                        id: marathon.payload.id, 
                        ...marathon.payload.data(), 
                        fecha_inicio_format: moment(marathon.payload.data().fecha_inicio.toDate()).format('YYYY-MM-DD kk:mm'), 
                        fecha_final_format: moment(marathon.payload.data().fecha_final.toDate()).format('YYYY-MM-DD kk:mm'), 
                        lecciones: lessons 
                    });
                observer.complete();
            });
        }); 
    }

    public createMarathon(data: any){ 
        return new Observable((observer) => {
            data.fecha_registro = this.timeService.getDate();
            data.lecciones = [];
            data.inscritos = [];
            this.firestore.collection(`maratones`).add(data)
            .then(async new_marathon => {
                observer.next(new_marathon.id);
                observer.complete();
            });
        });
    }

    public updateMarathon(data: any, id: string){
        return new Observable((observer) => {
            this.firestore.doc(`maratones/${ id }`)
            .set(data, { merge: true })
            .then(data => {
                observer.next();
                observer.complete();
            });
        });
    }

    public hideMarathon(id: string, hide: boolean){
        return this.firestore.doc(`maratones/${ id }`).set({ oculta: hide }, { merge: true });
    }

    public stateMarathon(marathon){
        let register_exist = marathon.inscritos.find(item => { return item.user_id == this.userService.getUserId() });

        if(this.timeService.getMomentDate() <= moment(marathon.fecha_final.toDate()) && this.timeService.getMomentDate() >= moment(marathon.fecha_inicio.toDate()))
          return 'proceso';
        else if(this.timeService.getMomentDate() >= moment(marathon.fecha_final.toDate()))
          return 'finalizado';
        else if(register_exist)
          return 'inscrito';
        else
          return 'programado';
    }

    public setMarathonCurrent(marathon: any){
        this.marathonCurrent.next(marathon);
    }
}