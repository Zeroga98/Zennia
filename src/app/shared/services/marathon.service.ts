import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest, defer, Observable, Observer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as moment from 'moment';

import { ApiService } from './api.service';

@Injectable()
export class MarathonService {

    constructor(
        private api: ApiService,
        private firestore: AngularFirestore
    ) { }

    public getMarathon(): Observable<any>{
    	return new Observable((observer) => {
	    	this.firestore.collection(`maratones`).ref.get()
	    	.then((marathons: any) => {
	    		let data_parser = [];
	    		marathons.docs.map(item => data_parser.push({ id: item.id, ...item.data(), fecha_inicio_parse: item.data().fecha_inicio.toDate() }));
			    observer.next(data_parser);
			    observer.complete();
	    	});
    	});
    }

    public getMarathonById(id: string): Observable<any>{
        return new Observable((observer) => {
            this.firestore.doc(`maratones/${ id }`).snapshotChanges()
            .subscribe((marathon: any) => {
                let lessons = [];
                marathon.payload.data().lecciones.map(async (lec: any) => {
                      let res = await lec.get();
                      if(!res.data().oculta){
                          //let user_id = this.userService.getUserId();
                          //let user_results = await this.firestore.doc(`resultado_lecciones/${ user_id }-${ res.id }`).ref.get();
                          lessons.push({ id: res.id, ...res.data()/*, results: user_results.data()*/ });
                      }
                });
                observer.next({ 
                    id: marathon.payload.id, 
                    ...marathon.payload.data(), 
                    fecha_inicio: moment(marathon.payload.data().fecha_inicio.toDate()).format('YYYY-MM-DD'), 
                    hora_inicio: moment(marathon.payload.data().fecha_inicio.toDate()).format('kk:mm'), 
                    fecha_final: moment(marathon.payload.data().fecha_final.toDate()).format('YYYY-MM-DD'), 
                    hora_final: moment(marathon.payload.data().fecha_final.toDate()).format('kk:mm'), 
                    lecciones: lessons 
                });
                observer.complete();
            });
        }); 
    }

    public createMarathon(data: any){ 
        return new Observable((observer) => {
            data.fecha_registro = new Date();
            data.lecciones = [];
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
}