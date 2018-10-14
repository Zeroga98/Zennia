import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';

import { ChairaAuth } from '../constanst';

@Injectable()
export class AuthService {

    private user: Subject<any> = new BehaviorSubject<any>(null);
    public $user = this.user.asObservable();

    constructor(
        private api: ApiService,
        private router: Router,
        private firestore: AngularFirestore
    ) { }
 
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

    public saveDataLocalStorage(data: any){
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", data.scope);
    }

    public saveUserFirebase(user: any){
      this.firestore.collection('usuarios')
      .add({ 
        correo: user.CORREO,
        foto: user.FOTO,
        genero: user.GENERO,
        nombres: user.NOMBRES,
        rol: user.ROL
      });
    }

    public setUser(user){
      this.user.next(user);
    }

    public getUserLocalStorage(){
      return JSON.parse(localStorage.getItem('user'))[0];
    }

    public isAuth(){
      return localStorage.getItem('user') != null;
    }

    public logout(){
      localStorage.clear();
    }
}