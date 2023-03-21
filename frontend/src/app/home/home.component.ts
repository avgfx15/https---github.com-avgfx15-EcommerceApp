import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // constructor(private productServices: ProductService) {}

  // ngOnInit(): void {
  //   this.productServices.getAllProducts().subscribe((resData) => {
  //     console.log(resData);
  //   });
  // }

  resData: any = [];
  isDisable: boolean = false;
  showMessage: string = '';
  latestProducts: ProductModel[] = [];
  trendyProducts: ProductModel[] = [];

  constructor(private productServices: ProductService) {}

  ngOnInit(): void {
    /// Load latestProducts on loading page

    this.productServices.latestProducts().subscribe((res) => {
      this.resData = res;
      if (!this.resData.status) {
        this.isDisable = true;
        this.showMessage = this.resData.message;
        setTimeout(() => {
          this.isDisable = false;
        }, 3000);
      }
      /// If status is true from backend then stor products in latestProducts variable

      this.latestProducts = this.resData.latestProducts;
    });

    /// Trendy Products All Products
    this.productServices.trendyProducts().subscribe((res) => {
      this.resData = res;

      if (!this.resData.status) {
        this.isDisable = true;
        this.showMessage = this.resData.message;
        setTimeout(() => {
          this.isDisable = false;
        }, 3000);
      }
      /// If status is true from backend then stor products in latestProducts variable

      this.trendyProducts = this.resData.trendyProducts;
    });
  }
}
