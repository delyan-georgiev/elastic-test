import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  searchObject = {queryString: '', category: ''};
  results: any;
  categories = ProductService.PRODUCT_CATEGORIES;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {

  }



  onSearch() {
    this.productService.searchTitle(this.searchObject)
      .subscribe((results: Array<Object>) => {
          this.results = results;
        }, // Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
  }
}
