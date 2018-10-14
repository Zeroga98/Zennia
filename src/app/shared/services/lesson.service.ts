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

    public getLessonById(id: string): Observable<any>{
    	return new Observable((observer) => {
    		let data_parse: any;
	    	this.firestore.doc(`lecciones/${ id }`).snapshotChanges()
	    	.subscribe((lesson: any) => {
	    		data_parse = { id: lesson.payload.id, ...lesson.payload.data() }
			    observer.next(data_parse);
			    observer.complete();
	    	});
    	});
    }

    public setLessonCurrent(lesson: any){
    	this.lessonCurrent.next(lesson);
    }
}