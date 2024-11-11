import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "https://utn-lubnan-api-2.herokuapp.com/api/Product";

  constructor(private httpClient : HttpClient) { }

  getAll() : Promise<any> {
    return this.httpClient.get(this.url) 
      .toPromise();
  }
}
