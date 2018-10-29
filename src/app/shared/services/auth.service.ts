import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest, defer, Observable, Observer } from 'rxjs';

import { ChairaAuth } from '../constanst';

@Injectable()
export class AuthService {

    constructor(
        private api: ApiService,
        private router: Router,
        private firestore: AngularFirestore
    ) { }

    public login(email: string, password: string){
      return new Observable((observer) => {
        this.firestore.collection('usuarios', ref => 
          ref
          .where('correo', '==', email)
          .where('contrasena', '==', password)
         )
        .snapshotChanges()
        .subscribe((user: any) => {
          if(user.length > 0){
            delete user[0].payload.doc.data()['contrasena'];
            observer.next({ state: 'OK', user: { id: user[0].payload.doc.id, ...user[0].payload.doc.data() }});
          } else {
            observer.next({ state: 'ERROR', type: "user_not_exist"});
          }
          observer.complete();
        });
      });
    }
 
    public getAccessToken(code: string) {
        return this.api.post(
        	undefined, 
        	`http://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/token`, 
        	{
               grant_type: "authorization_code", 
               code: code,
               redirect_uri: ChairaAuth.callback_url,
               client_id: ChairaAuth.client_id,
               client_secret: ChairaAuth.client_secret,
               state: "OK"
            });
    }

    public saveDataLocalStorage(user: any){
      localStorage.setItem("name", user.nombres);
      localStorage.setItem("token", user.id);
    }

    public signup(user: any){
      this.firestore.collection('usuarios')
      .add({ 
        correo: user.CORREO,
        foto: user.FOTO,
        genero: user.GENERO,
        nombres: user.NOMBRES,
        rol: user.ROL
      });
    }

    public isAuth(){
      return localStorage.getItem('token') != null;
    }

    public logout(){
      localStorage.clear();
    }
}