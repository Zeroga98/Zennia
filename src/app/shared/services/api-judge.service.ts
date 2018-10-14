import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest, defer, Observable, Observer } from 'rxjs';


@Injectable()
export class ApiJudgeService {

    private user: Subject<any> = new BehaviorSubject<any>(null);
    public $user = this.user.asObservable();

    constructor(
        private api: ApiService,
        private firestore: AngularFirestore
    ) { }

    public submission(data){
		return this.api.post('api_judge', '/submissions/?base64_encoded=false&wait=true', data);
    }
}