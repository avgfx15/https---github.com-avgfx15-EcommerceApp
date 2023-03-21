import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductModel } from '../model/product';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /// Event Emiter for CartData to get latest Data
  cartDataAvailable = new EventEmitter<ProductModel[] | []>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  //` Add new Product Service
  addNewProduct(newProductData: ProductModel) {
    return this.httpClient.post(
      'http://localhost:4700/seller/addproduct',
      newProductData
    );
  }

  //` Get All Products Service
  getAllProducts() {
    return this.httpClient.get<ProductModel[]>(
      'http://localhost:4700/seller/allproducts'
    );
  }

  //` Get Product By Id
  getProductById(id: string) {
    return this.httpClient.get<ProductModel>(
      `http://localhost:4700/seller/product/${id}`
    );
  }

  //` Edit || Update Product by ID

  updateProductById(product: ProductModel) {
    return this.httpClient.patch(
      `http://localhost:4700/seller/update/${product._id}`,
      product
    );
  }

  //` Delete Product By Id
  deleteProductById(id: string) {
    return this.httpClient.delete(`http://localhost:4700/seller/delete/${id}`);
  }

  //` Latest Products
  latestProducts() {
    return this.httpClient.get('http://localhost:4700/seller/latestproducts');
  }

  //` Trendy Products
  trendyProducts() {
    return this.httpClient.get('http://localhost:4700/seller/trendyproducts');
  }

  //` Serach Products By Query

  searchByQuery(query: string) {
    return (
      this,
      this.httpClient.get<ProductModel[]>(
        `http://localhost:4700/seller/${query}`
      )
    );
  }

  //` Product Add to LocalStorage by clicking on AddToCart

  AddToLocalStorage(inputData: ProductModel) {
    ///Create Cariable to Add data in cart CartData
    let cartData = [];

    /// Check localstorage if any Product available in cart or not if available then get product
    let localCart = localStorage.getItem('localCart');

    /// If localstorage cart is emply then add product in localstorage cart

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([inputData]));
    } else {
      /// If localstorage already have product then push new productData in localstorage
      /// Localstorage data convert stringify to parse

      cartData = JSON.parse(localCart);

      /// Push New productData to localstorageCart
      cartData.push(inputData);

      /// Now Add new data to localstorage in cartData

      localStorage.setItem('localCart', JSON.stringify(cartData));
    }

    /// If Cart Data Available then get latest data

    this.cartDataAvailable.emit(cartData);
  }

  //` RemoveProductFromCart Services
  removeProductFromCart(productId: string) {
    /// Check localstorage full with product
    let cartData = localStorage.getItem('localCart');

    /// If cartData available then get product in array

    if (cartData) {
      let cartProducts: ProductModel[] = JSON.parse(cartData);

      /// Filter cartData by filter cartProduct and rest all product store in cartProducts
      cartProducts = cartProducts.filter(
        (cartProduct: ProductModel) => productId !== cartProduct._id
      );
      /// Now remaining products store cartProducts and store in localstore
      localStorage.setItem('localCart', JSON.stringify(cartProducts));

      /// Update header by emit
      this.cartDataAvailable.emit(cartProducts);
    }
  }
  //` Add to cart function

  addToCart(cartData: Cart) {
    return this.httpClient.post(`http://localhost:4700/cart`, cartData);
  }
}
