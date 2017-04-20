import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {
  orders: Array<Object>;
  constructor(private OrderService: OrderService) { }

  ngOnInit() {
    const self = this;

    this.OrderService.getAllOrders()
      .subscribe((results: Array<Object>) => {
          self.orders = results;
        },
        err => {
          console.log(err);
        });
  }



}
