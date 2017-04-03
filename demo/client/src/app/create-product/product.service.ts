import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Product} from '../models/product.model';
@Injectable()
export class ProductService {
  constructor(private http: Http) {
  }
  create(product) {
    console.error(product);
    return this.http.post('api/products', product)
      .subscribe(data => {
        alert('ok');
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }
}
