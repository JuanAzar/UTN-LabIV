import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCredentials } from '../models/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = undefined;
  redirectUrl: string;

  constructor (private http: HttpClient){

  }

  login(loginCredentials : LoginCredentials): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const observable = this.http.post('https://localhost:44320/api/User/Login', loginCredentials, httpOptions);

    observable.subscribe(
      response => {
      
      this.token = response['token'];
      console.log(this.token);
      localStorage.setItem('token', this.token);      
    },
      error => {
        
    })

    return observable;
  }

  logout(): void {
    this.token = undefined;
  }
}
