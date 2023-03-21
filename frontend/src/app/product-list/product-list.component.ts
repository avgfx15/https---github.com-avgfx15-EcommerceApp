import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  resData: any = [];
  isDisabled: boolean = false;
  showMessage: string = '';
  products: ProductModel[] = [];
  constructor(
    private productServices: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /// After delete refresh page and load product list again
    this.refreshProductList();
  }

  /// Delete Product By Id

  deleteProduct(id: string) {
    this.productServices.deleteProductById(id).subscribe((res) => {
      this.resData = res;
      if (!this.resData.status) {
        this.isDisabled = true;
        this.showMessage = this.resData.message;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      }
      this.isDisabled = true;
      this.showMessage = this.resData.message;
      this.refreshProductList();
      setTimeout(() => {
        this.isDisabled = false;
      }, 3000);
    });
  }

  /// After delete refresh page and load product list again
  refreshProductList() {
    this.productServices.getAllProducts().subscribe((res) => {
      this.resData = res;
      if (!this.resData.status) {
        this.isDisabled = true;
        this.showMessage = this.resData.message;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      }
      this.products = this.resData.products;
    });
  }
}
