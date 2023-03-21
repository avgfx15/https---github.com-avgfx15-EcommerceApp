import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  resData: any = [];
  isDisabled: boolean = false;
  showMessage: string = '';
  success: boolean = true;
  searchProducts: ProductModel[] | undefined = [];
  cartQty: number = 0;
  isCartFull: boolean = false;

  constructor(
    private router: Router,
    private productServices: ProductService
  ) {}

  ngOnInit(): void {
    /// To check event Value on route visit and get route url value
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        /// Check Condition if value.url contain seller word and data in localstorage by name seller then only display seller Navbar
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          /// If Seller Navbaris active then display seller name on Navbar for that check localstorage with seller data
          if (localStorage.getItem('seller')) {
            /// get seller data from localstorage and store in variable
            var sellerStore = localStorage.getItem('seller');
            /// localstorage store data in stringfy format so convert in to JSON format
            var sellerData = sellerStore && JSON.parse(sellerStore);
            /// Now display seller name from seller data
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }
        } else if (localStorage.getItem('user')) {
          /// get seller data from localstorage and store in variable
          var userStore = localStorage.getItem('user');
          /// localstorage store data in stringfy format so convert in to JSON format
          var userData = userStore && JSON.parse(userStore);
          /// Now display seller name from seller data
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    });

    /// Check if cartData in localstorage available or not

    let cartData = localStorage.getItem('localCart');
    /// cartdata already available in localstorage then
    if (cartData) {
      this.isCartFull = true;
      this.cartQty = JSON.parse(cartData).length;
    }
    /// To get latest cart value get data from product service emitter
    this.productServices.cartDataAvailable.subscribe((cartValue) => {
      this.cartQty = cartValue.length;
    });
  }

  /// Logout delete all data from localstorage and navigate to home page
  logOut() {
    if (localStorage.getItem('seller')) {
      localStorage.removeItem('seller');
      this.router.navigate(['/']);
    }
  }

  userLogOut() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.router.navigate(['/user']);
    }
  }
  //` Search Products by Query from search bar
  searchByQuery(query: KeyboardEvent) {
    if (query) {
      /// get query as a text
      const searchText = query.target as HTMLInputElement;
      /// Get response from backend
      this.productServices.searchByQuery(searchText.value).subscribe((res) => {
        this.resData = res;
        if (!this.resData.status) {
          this.isDisabled = true;
          this.success = false;
          this.showMessage = this.resData.message;
        }

        /// If search Porducts are more then 5 then display only 5

        if (this.resData.Products.length > 5) {
          this.resData.Products.length = 5;
        }
        this.isDisabled = true;
        this.success = true;
        this.showMessage = this.resData.message;
        this.searchProducts = this.resData.Products;
      });
    }
  }

  /// On out side click from searchbar then nothing will happend or hide search
  hideSearch() {
    this.searchProducts = undefined;
  }

  /// If there is search result then navigate to searchProduct page
  searchresult(value: any) {
    this.router.navigate([`search/${value}`]);
  }
  /// Click on search result redirect to Product Detail Page
  redirectToProductDetail(id: string) {
    this.router.navigate(['/productdetails/' + id]);
  }
}
