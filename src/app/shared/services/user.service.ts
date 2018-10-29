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

    public getUser(id: string): Observable<any>{
    	return new Observable((observer) => {
	    	this.firestore.doc(`usuarios/${ id }`)
	    	.snapshotChanges()
	    	.subscribe((user: any) => {
			    observer.next({ id: user.payload.id, ...user.payload.data() });
			    observer.complete();
	    	});
    	});
    }

    public setUserCurrent(user: any){
    	this.userCurrent.next(user);
    }
}