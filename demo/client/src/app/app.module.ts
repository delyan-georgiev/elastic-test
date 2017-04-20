import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductService } from './product.service';
import { ProductsTableComponent } from './products-table/products-table.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import {OrderService} from './order.service';

const ROUTES = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: CreateProductComponent
  },
  {
    path: 'search',
    component: ProductSearchComponent
  },
  {
    path: 'search/:orderId',
    component: ProductSearchComponent
  },
  {
    path: 'orders',
    component: OrdersTableComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    ProductSearchComponent,
    ProductsTableComponent,
    OrderCreateComponent,
    OrdersTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [ProductService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
