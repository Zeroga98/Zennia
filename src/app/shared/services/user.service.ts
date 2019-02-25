import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest, defer, Observable, Observer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { TokenService } from './token.service';

import { ApiService } from './api.service';

@Injectable()
export class UserService {

    private userCurrent: Subject<any> = new BehaviorSubject<any>(null);
    public $userCurrent = this.userCurrent.asObservable();


    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private api: ApiService,
        private firestore: AngularFirestore,
        private tokenService: TokenService
    ) { }

    populate() {
        if (this.tokenService.getToken()) {
            this.setAuth(window.localStorage['name']);
            console.log( window.localStorage['name']);
        } else {
            this.purgeAuth();
        }
    }

    public getUser(id: string): Observable<any> {
        return new Observable((observer) => {
            this.firestore.doc(`usuarios/${id}`)
                .snapshotChanges()
                .subscribe((user: any) => {
                    observer.next({ id: user.payload.id, ...user.payload.data() });
                    observer.complete();
                });
        });
    }

    public getUserRol(): Observable<any> {
        return new Observable((observer) => {
            this.firestore.doc(`usuarios/${this.getUserId()}`)
                .snapshotChanges()
                .subscribe((user: any) => {
                    observer.next(user.payload.data().rol);
                    observer.complete();
                });
        });
    }

    public setUserCurrent = (user: any) => this.userCurrent.next(user);

    public setAuth(user: any) {
        this.userCurrent.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    public purgeAuth() {
        this.tokenService.destroyToken();
        this.userCurrent.next({} as any);
        this.isAuthenticatedSubject.next(false);
    }
    public getUserId() {
        return localStorage.getItem('token');
    }
}