import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  @Input() orderProducts = [];
  name: string;
  constructor(private OrderService: OrderService) { }

  ngOnInit() {
  }

  createOrder() {
    this.OrderService.createOrder(this.name, this.orderProducts);
  }

}
