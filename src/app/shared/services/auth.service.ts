import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { ChairaAuth } from '../constanst';

@Injectable()
export class AuthService {

    constructor(
        private api: ApiService,
        private router: Router
    ) { }

    /*public getAccessToken(state: string, code: string) {
        return this.api.post(
        	'motorola_auth', 
        	`/token.oauth2?client_id=${MotorolaAuth.client_id}&response_type=code&state=${state}&redirect_uri=${MotorolaAuth.callback_url}&grant_type=authorization_code&client_secret=${MotorolaAuth.client_secret}&code=${code}`, 
        	undefined);
    }*/
}