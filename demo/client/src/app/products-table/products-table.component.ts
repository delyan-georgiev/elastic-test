import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../product.service';

import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  @Input() products: Array<Object>;
  orderProducts = [];
  private urlParams: any;
  private sub: any;

  constructor(private productService: ProductService, private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit() {
    const self = this;
    this.sub = this.route.params.subscribe(
      params => {
        this.urlParams = params;
        console.error(this.urlParams);
        if (params['orderId']) {
          this.getOrderProducts(+params['orderId']);
        }
      }
    );
    console.error(this.urlParams, Object.keys(this.urlParams).length);
    if (this.urlParams.length === 0) {
      this.productService.getAllProducts()
        .subscribe((results: Array<Object>) => {
            self.products = results;
          },
          err => {
            // Log errors if any
            console.log(err);
          });
    }
  }

  getOrderProducts(orderId) {
    this.orderService.getOrderProducts(orderId)
      .subscribe((results: Array<Object>) => {
          this.products = results;
        }, // Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  addToOrder(productId: number) {
    this.orderProducts.push(productId);
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
