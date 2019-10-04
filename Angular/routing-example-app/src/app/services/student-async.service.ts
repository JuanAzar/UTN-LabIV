//student.service.ts
import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentAsyncService {
  constructor(private http: HttpClient) { }

  add(student: Student){
    
  }

  getAll() : Promise<any>{
    return this.http.get('https://utn2019-avanzada2-tp8.herokuapp.com/api/students')
      .toPromise();
  }

  getById(studentId: number){
    
  }  
}

