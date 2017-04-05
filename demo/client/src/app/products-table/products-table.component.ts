import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  @Input() products = {};
  inEditMode = false;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    const self = this;

    this.productService.getAllProducts()
      .subscribe((results: Array<Object>) => {
          console.error(results);
          self.products = results;
        }, // Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  onToggleEdit(product: {inEditMode: boolean}) {
    product.inEditMode = !product.inEditMode;
  }

  onSave(product: Object) {
    console.error('@onSave');
    this.productService.edit(product);
  }

}
