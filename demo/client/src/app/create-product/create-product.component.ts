import { Component, OnInit } from '@angular/core';

import {ProductService} from '../product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent implements OnInit {
  // mode = 'Observable';
  categories = ProductService.PRODUCT_CATEGORIES;

  model = new Product('', '', 'All', null);


  constructor(private productService: ProductService) {
  }

  onSubmit() {
    this.productService.create(this.model);
  }

  ngOnInit() {

  }

}
