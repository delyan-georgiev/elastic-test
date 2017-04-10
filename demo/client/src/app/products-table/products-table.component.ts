import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  @Input() products: Array<Object>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    const self = this;

    this.productService.getAllProducts()
      .subscribe((results: Array<Object>) => {
          self.products = results;
        },
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  onToggleEdit(product: {inEditMode: boolean}) {
    product.inEditMode = !product.inEditMode;
  }

  onSave(product: Object) {
    this.productService.edit(product);
  }

  onDelete(product: {id: number}) {
    this.productService.remove(product.id);

    this.products.splice(this.products.indexOf(product), 1);
  }

}
