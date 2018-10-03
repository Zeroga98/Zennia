import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    public get(api: string, path: string) {
        return this.http.get(
            `${((api)? environment.serverUrl[api]: '') + path}`
        );
    }

    public delete(api: string, path: string) {
        return this.http.delete(
            `${((api)? environment.serverUrl[api]: '') + path}`
        );
    }

    public put(api: string, path: string, params: any) {
        return this.http.put(
            `${((api)? environment.serverUrl[api]: '') + path}`,
            params
        );
    }

    public post(api: string, path: string, params: any) {
        return this.http.post(
            `${((api)? environment.serverUrl[api]: '') + path}`,
            params
        );
    }
}