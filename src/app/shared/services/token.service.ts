import { Injectable } from '@angular/core';


@Injectable()
export class TokenService {

  getToken(): String {
    return window.localStorage['token'];
  }

  saveToken(token: String) {
    window.localStorage['token'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('token');
  }

}
