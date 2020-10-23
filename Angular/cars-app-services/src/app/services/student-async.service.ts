//student.service.ts
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentAsyncService {
  private apiURL = 'https://utn-avanzada2-students.herokuapp.com/api/student/'
  constructor(private http: HttpClient) { }
  
  getAll(): Promise<any>{
    return this.http.get(this.apiURL)
      .toPromise();
  }

  getById(studentId: number): Promise<any>{
    console.log(this.apiURL + studentId);
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

