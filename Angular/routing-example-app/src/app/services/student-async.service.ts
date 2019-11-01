//student.service.ts
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentAsyncService {
  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/students/'
  constructor(private http: HttpClient) { }

  getAll2(): Promise<any>{
    return this.http.get(this.apiURL)
      .toPromise();
  }

  getAll() {
    return this.http.get(this.apiURL);
  }

  getById(studentId: number): Promise<any>{
    return this.http.get(this.apiURL + studentId)
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

