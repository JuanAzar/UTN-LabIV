import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //url = "https://localhost:44320/api/Product";
  url = "https://utn-avanzada2-tp-final.herokuapp.com/api/Product"

  constructor(private httpClient : HttpClient) { }

  getAll() : Promise<any> {
    return this.httpClient.get(this.url) 
      .toPromise();
  }
}
