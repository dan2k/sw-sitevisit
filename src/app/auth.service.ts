import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { url } from './config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {  }
  getAuth() {
    let params = new HttpParams().set('action', 'getAuth');
    return this.http.get(`${url}/sitevisit.php`, { params: params });
  }
}
