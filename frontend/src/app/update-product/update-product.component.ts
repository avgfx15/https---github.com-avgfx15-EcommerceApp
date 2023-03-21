import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  isDisabled: boolean = false;
  success: boolean = true;
  showMessage: string = '';
  resData: any = [];
  productData: undefined | ProductModel;

  constructor(
    private productServices: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    /// Get product id from click on product edit Icon
    let productId = this.activatedRoute.snapshot.paramMap.get('id');

    /// Check if Product is not null and product available hten get get product data
    productId &&
      this.productServices.getProductById(productId).subscribe((res) => {
        this.productData = res;
      });
  }

  //` Update product by click on Update Product

  updateProduct(updateProductData: ProductModel) {
    /// Product Id not available in updateProductdata so,
    /// Push product id in updateProductData
    if (this.productData) {
      updateProductData._id = this.productData._id;
    }

    /// check status from backend and then show message and get response from backend
    this.productServices
      .updateProductById(updateProductData)
      .subscribe((res) => {
        this.resData = res;

        /// Backend response status is false then show message
        if (!this.resData) {
          this.isDisabled = true;
          this.showMessage = this.resData.message;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        } else {
          /// Status is true then get response message and update data and save
          this.isDisabled = true;
          this.showMessage = this.resData.message;
          setTimeout(() => {
            this.isDisabled = false;
            this.router.navigate(['sellerproductlist']);
          }, 3000);
        }
      });
  }
}
