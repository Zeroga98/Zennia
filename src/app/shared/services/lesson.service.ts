import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest, defer, Observable, Observer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable()
export class LessonService {

	private lessonCurrent: Subject<any> = new BehaviorSubject<any>(null);
	public $lessonCurrent = this.lessonCurrent.asObservable();

    constructor(
        private api: ApiService,
        private firestore: AngularFirestore
    ) { }

    public test(id: string, output: string){ 
        this.firestore.doc(`lecciones/${ id }`)
        .set({
            submission: { expected_output: output }
        }, { merge: true })
        .then(data => {
            console.log(data);
        });
    }

    public getLessonById(id: string): Observable<any>{
    	return new Observable((observer) => {
	    	this.firestore.doc(`lecciones/${ id }`).snapshotChanges()
	    	.subscribe((lesson: any) => {
			    observer.next({ id: lesson.payload.id, ...lesson.payload.data() });
			    observer.complete();
	    	});
    	});
    }

    public saveResult(user_id: string, lesson_id: string, submission: any){
        let state = true;
        return new Observable((observer) => {
            let subscribe = this.firestore.doc(`resultado_lecciones/${ user_id }-${ lesson_id }`).snapshotChanges()
            .subscribe((responses: any) => {
                if(state){
                    state = false;
                    this.firestore.doc(`resultado_lecciones/${ user_id }-${ lesson_id }`)
                    .set({
                        estado: (responses.payload.data().estado)? true: (submission.status == 'Accepted'),
                        responses: [ ...responses.payload.data().responses, ...submission ]
                    }, { merge: true })
                    .then(data => {
                        subscribe.unsubscribe();
                        observer.complete();
                    });
                }
                //observer.next(data_parse);
            });
        });
    }

    public setLessonCurrent(lesson: any){
    	this.lessonCurrent.next(lesson);
    }
}