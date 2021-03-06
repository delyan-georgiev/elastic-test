import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  public static PRODUCT_CATEGORIES = ['All', 'Electronics', 'Clothes', 'Toys', 'Accessories'];

  constructor(private http: Http) {
    this.http = http;
  }

  getAllProducts() {
    return this.http.get('api/getAll')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(product: Object) {
    return this.http.post('api/add', product)
      .subscribe(
        data => data.json(),
        error => {
          console.error(JSON.stringify(error.json()));
        }
      );
  }

  searchTitle(search: Object) {
    console.error('service search', search);
    return this.http.post('api/search', {search})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  edit(product: any) {
    console.error('@service edit', product);
    return this.http.post('api/edit', product)
      .subscribe(
        data => data.json(),
        error => {
          console.error(JSON.stringify(error.json()));
        }
      );
  }

  remove(id: number) {
    return this.http.post('api/delete', {id})
      .subscribe(
        (res: Response) => res.json(),
        (error: any) => Observable.throw(error.json().error || 'ServerError')
      );
  }

}
