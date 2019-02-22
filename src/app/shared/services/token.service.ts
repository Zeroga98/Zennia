import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  public getToken(): string {
    return localStorage['token'] ? localStorage['token'] : null;
  }

  public getPayload(): any {
    let token = this.getToken();
    let b64DecodeUnicode = str => decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));

    let parseJwt = token =>
      JSON.parse(
        b64DecodeUnicode(
          token.split('.')[1].replace('-', '+').replace('_', '/')
        )
      )
    if (token && 3 === token.split(".").length) {
      let payload: any = parseJwt(token);
      let user: any = {};
      user.correo = payload.correo;
      user.nombre = payload.nombre;
      user.exp = payload.exp;
      user.iat = payload.iat;
      user.role = (payload.student == 1) ? 'Student' : (payload.teacher == 1) ? 'Teacher' : 'Admin';
      return (user);
    }
  }

  public saveToken(token: string) {
    localStorage['token'] = token;
  }

  public destroyToken() {
    localStorage.removeItem('token');
  }
}