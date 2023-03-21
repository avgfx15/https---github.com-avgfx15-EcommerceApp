import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product';
import { ProductService } from '../services/product.service';
import { SellerServices } from '../services/seller-services.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  productData: ProductModel[] = [];
  resData: any = [];
  isDisabled: boolean = false;
  showMessage: string = '';
  success: boolean = true;
  productImageValue: string = '';
  productNameValue: string = '';
  productQtyValue: number = 0;
  productCategoryValue: string = '';
  productColorValue: string = '';
  productPriceValue: number = 0;
  productDescriptionValue: string = '';
  constructor(
    private sellerServices: SellerServices,
    private productServices: ProductService
  ) {}

  ngOnInit(): void {}
  addProduct(addProductFormData: ProductModel) {
    this.productServices.addNewProduct(addProductFormData).subscribe((res) => {
      this.resData = res;

      /// Check Server response status
      if (!this.resData.status) {
        /// Server response status is false hten display error message from server
        this.isDisabled = true;
        this.success = false;
        this.showMessage = this.resData.message;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      }
      /// Server response status is true hten display message from server and save product in database
      this.isDisabled = true;
      this.success = true;
      this.showMessage = this.resData.message;
      this.productData = this.resData.product;
      setTimeout(() => {
        this.isDisabled = false;
      }, 3000);
    });
  }
}
