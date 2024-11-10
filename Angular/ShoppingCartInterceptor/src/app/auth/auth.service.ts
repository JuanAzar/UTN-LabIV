import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = undefined;
  userDetails = undefined;

  loginUrl = "https://utn-lubnan-api-2.herokuapp.com/api/User/Login";
  redirectUrl: string = "";

  constructor (private http: HttpClient){

  }

  login(loginCredentials : LoginCredentials): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const promise = this.http.post(this.loginUrl, loginCredentials, httpOptions)
    .toPromise();

    promise
      .then((response : any)=> { 
        this.token = response['token'];
        
        sessionStorage.setItem('token', this.token!);      
      })
      .catch((error : any) => {
        console.log(error);
      })

    return promise;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.token = undefined;
  }
}
