import { Component, OnInit } from '@angular/core';

import {ProductService} from './product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent implements OnInit {
  // mode = 'Observable';
  categories = ['All', 'Electronics', 'Clothes', 'Toys', 'Accessories'];

  model = new Product('', '', 'All', null);


  constructor(private productService: ProductService) {
  }

  onSubmit() {
    console.log(this.model);
    this.productService.create(this.model);
  }

  ngOnInit() {

  }

}
