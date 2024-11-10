import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentAsyncService {
  private apiURL = 'https://utn-lubnan-api-1.herokuapp.com/api/Student'
  constructor(private http: HttpClient) { }
  
  getAll(): Promise<any>{
    return this.http.get(this.apiURL)
      .toPromise();
  }

  getById(studentId: number): Promise<any>{
    return this.http.get(this.apiURL + '/' + studentId)
      .toPromise();
  }

  getByEmail(email: string): Promise<any>{
    return this.http.get(this.apiURL + '/GetByEmail/' + email)
      .toPromise();
  }

  add(student: Student): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this.http.post(this.apiURL, student, httpOptions)
      .toPromise();
  }
}