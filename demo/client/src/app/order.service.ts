import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private http: Http) {
    this.http = http;
  }

  getAllOrders() {
    return this.http.get('api/getAllOrders')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createOrder(name: string, products: Array<number>) {
    console.error('createOrder() @OrderService');
    return this.http.post('api/createOrder', {orderName: name, products})
      .subscribe(
        (res: Response) => res.json(),
        (error: any) => Observable.throw(error.json().error || 'ServerError')
      );
  }

  getOrderProducts(orderId: number) {
    return this.http.post('api/getOrderProducts', {orderId})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
