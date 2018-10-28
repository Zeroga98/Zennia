import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest, defer, Observable, Observer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable()
export class UserService {

	private userCurrent: Subject<any> = new BehaviorSubject<any>(null);
	public $userCurrent = this.userCurrent.asObservable();

    constructor(
        private api: ApiService,
        private firestore: AngularFirestore
    ) { }

    public getUser(email: string): Observable<any>{
    	return new Observable((observer) => {
	    	this.firestore.collection('usuarios', ref => ref.where('correo', '==', email))
	    	.snapshotChanges()
	    	.subscribe((user: any) => {
			    observer.next({ id: user[0].payload.doc.id, ...user[0].payload.doc.data() });
			    observer.complete();
	    	});
    	});
    }

    public setUserCurrent(user: any){
    	this.userCurrent.next(user);
    }
}