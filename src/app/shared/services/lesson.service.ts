import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest, defer, Observable, Observer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { ApiService } from './api.service';
import { TimeService } from './time.service';

@Injectable()
export class LessonService {

	private lessonCurrent: Subject<any> = new BehaviorSubject<any>(null);
	public $lessonCurrent = this.lessonCurrent.asObservable();

    constructor(
        private api: ApiService,
        private timeService: TimeService,
        private firestore: AngularFirestore
    ) { }

    public createLesson(data: any, reference_id: string, type: string){ 
        return new Observable((observer) => {
            data.fecha_registro = this.timeService.getDate();
            this.firestore.collection(`lecciones`).add(data)
            .then(async new_lesson => {
                let reference = await this.firestore.doc(`${ type }/${ reference_id }`).ref.get();
                this.firestore.doc(`${ type }/${ reference_id }`)
                .set({
                    lecciones: [ ...reference.data().lecciones, new_lesson ]
                }, { merge: true })
                .then(data => {
                    observer.next(new_lesson.id);
                    observer.complete();
                });
            });
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

    public updateLesson(data: any, lesson_id: string){
        return new Observable((observer) => {
            this.firestore.doc(`lecciones/${ lesson_id }`)
            .set(data, { merge: true })
            .then(data => {
                observer.next();
                observer.complete();
            });
        });
    }

    public saveResult(user_id: string, lesson_id: string, submission: any){
        let state = true;
        let id = `resultado_lecciones/${ user_id }-${ lesson_id }`;
        return new Observable((observer) => {
            let subscribe = this.firestore.doc(id).snapshotChanges()
            .subscribe((responses: any) => {
                if(state){
                    state = false;
                    let new_responses = (responses.payload.data())? [ ...responses.payload.data().responses, ...submission ]: [ submission ];

                    this.firestore.doc(id)
                    .set({
                        estado: (responses.payload.data() && responses.payload.data().estado)? true: (submission.status == 'Accepted'),
                        responses: new_responses
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

    public hideLesson(lesson_id: string, hide: boolean){
        return this.firestore.doc(`lecciones/${ lesson_id }`).set({ oculta: hide }, { merge: true });
    }

    public setLessonCurrent(lesson: any){
    	this.lessonCurrent.next(lesson);
    }
}