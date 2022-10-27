import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  get accessToken(): string {
    return localStorage.getItem("accessToken")!;
  }

  set accessToken(token: string | null) {
    if(token == "undefined") token = null;
    localStorage.setItem('accessToken', token!);
  }

  deleteAccessToken() {
    localStorage.removeItem('accessToken');
  }

  isUserLoggedIn(): Observable<boolean>{
    if(!this.accessToken || this.accessToken == null) return of(false)
    return of(true)
  }
}
