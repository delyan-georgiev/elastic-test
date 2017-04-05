import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  search = '';
  results: any;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {

  }

  onSearch() {
    const self = this;

    this.productService.searchTitle(this.search)
      .subscribe((results: Array<Object>) => {
          self.results = results;
        }, // Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }
}
