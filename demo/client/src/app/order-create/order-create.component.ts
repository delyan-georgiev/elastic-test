import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  name: string;
  orderProducts: number;
  constructor() { }

  ngOnInit() {
  }

}
