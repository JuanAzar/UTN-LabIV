import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/students';

  constructor(private httpClient : HttpClient) { }

  getAll(){
    return this.httpClient.get(this.url);
  }
}
