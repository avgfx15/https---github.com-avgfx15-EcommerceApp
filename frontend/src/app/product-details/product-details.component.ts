import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../model/cart';
import { ProductModel } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  resData: any = [];
  productData: undefined | ProductModel;
  inputQty: number = 1;
  removeFromCart: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productServices: ProductService
  ) {}

  ngOnInit(): void {
    /// Get ProductId from paramMap from activeroute
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    /// If ProductId is not undefined and response from backend
    productId &&
      this.productServices.getProductById(productId).subscribe((res) => {
        this.resData = res;
        this.productData = this.resData;

        /// If localstorage full with product then Reload cart on page opening
        let cartData = localStorage.getItem('localCart');

        /// localstorage full with product then check if product is available or not if available in cartData

        if (productId && cartData) {
          /// Retrive data from stringify to array
          let cartProducts = JSON.parse(cartData);
          /// Check and filter product data from cartData
          cartProducts = cartProducts.filter(
            (cartProduct: ProductModel) => productId == cartProduct._id
          );

          /// Check cartproducts available then add removeFromCart button

          if (cartProducts.length) {
            this.removeFromCart = true;
          } else {
            this.removeFromCart = false;
          }
        }
      });
  }

  /// Handle Product Qty By input button
  handleQty(val: string) {
    if (this.inputQty < 20 && val === 'plus') {
      this.inputQty += 1;
    } else if (this.inputQty > 1 && val === 'minus') {
      this.inputQty -= 1;
    }
  }

  //` Add To Cart
  addToCart() {
    /// Check if productData available then set inputQty as  productQty
    if (this.productData) {
      this.productData.productQty = this.inputQty;

      /// Check User is logged in or not

      if (!localStorage.getItem('user')) {
        /// add this Product with input Qty in localstorage
        this.productServices.AddToLocalStorage(this.productData);
        /// if product add to cart then display removeFromCart button
        this.removeFromCart = true;
      } else {
        /// Else User Logged In  then get user data from localstorage
        let user = localStorage.getItem('user');
        /// Get userId from localstorage
        let userId = user && JSON.parse(user)._id;

        /// cartData with products and UserId
        let cartData: Cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData._id,
        };

        delete cartData._id;
        this.productServices.addToCart(cartData).subscribe((res) => {
          this.resData = res;

          if (this.resData) {
            console.log(this.resData);
          }
        });
      }
    }
  }

  //` Remove from Cart
  /// Pass productId to remove from cart
  removeProductFromCart(productId: string) {
    this.productServices.removeProductFromCart(productId);
    this.removeFromCart = false;
  }
}
