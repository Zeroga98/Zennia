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

    public createLesson(data: any, course_id: string){ 
        let state = true;
        return new Observable((observer) => {
            data.fecha_registro = new Date();
            this.firestore.collection(`lecciones`).add(data)
            .then(new_lesson => {
                let subscribe = this.firestore.doc(`cursos/${ course_id }`).snapshotChanges()
                .subscribe((course: any) => {
                    if(state){
                        state = false;
                        this.firestore.doc(`cursos/${ course_id }`)
                        .set({
                            lecciones: [ ...course.payload.data().lecciones, new_lesson ]
                        }, { merge: true })
                        .then(data => {
                            subscribe.unsubscribe();
                            observer.next(new_lesson.id);
                            observer.complete();
                        });
                    }
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

    public setLessonCurrent(lesson: any){
    	this.lessonCurrent.next(lesson);
    }
}