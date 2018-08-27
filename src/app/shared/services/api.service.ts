import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    /*public get(api: string, path: string) {
        return this.http.get(
            `${environment.serverUrl[api] + path}`
        );
    }

    public delete(api: string, path: string) {
        return this.http.delete(
            `${environment.serverUrl[api] + path}`
        );
    }

    public put(api: string, path: string, params: any) {
        return this.http.put(
            `${environment.serverUrl[api] + path}`,
            params
        );
    }

    public post(api: string, path: string, params: any) {
        return this.http.post(
            `${environment.serverUrl[api] + path}`,
            params
        );
    }*/
}