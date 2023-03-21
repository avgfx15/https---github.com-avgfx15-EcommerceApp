import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel, SellerModel } from '../model/seller';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerServices {
  resData: any = [];
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  successStatus = new EventEmitter<boolean>(false);
  showMessage = new EventEmitter<string>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  /// Signup Function
  sellerSignUp(signupSellerData: SellerModel) {
    this.httpClient
      .post('http://localhost:4700/seller/signup', signupSellerData, {
        observe: 'response',
      })
      .subscribe((res) => {
        /// Get Response in resData
        this.resData = res;
        /// Check Status from Server side
        var serStatus = this.resData.body.status;
        /// Send Status to seller-auth Component for Further Action
        this.successStatus.emit(serStatus);
        /// Send Message to seller-auth Component for Display message
        this.showMessage.emit(this.resData.body.message);
        /// If Status is true then store seller data in localstorage and send feedback to auth-guard to access secure route
        if (serStatus) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem(
            'seller',
            JSON.stringify(this.resData.body.seller)
          );
        } else {
          /// If Status is false send feedback to auth-guard to restrict to access secure route
          this.isSellerLoggedIn.next(false);
        }
      });
  }

  /// Seller Log In function
  sellerLogin(sellerLoginData: LoginModel) {
    return this.httpClient
      .post('http://localhost:4700/seller/login', sellerLoginData, {
        observe: 'response',
      })
      .subscribe((res) => {
        /// Get Response in resData
        this.resData = res;
        /// Check Status from Server side
        var serStatus = this.resData.body.status;
        /// Send Status to seller-auth Component for Further Action
        this.successStatus.emit(serStatus);
        /// Send Message to seller-auth Component for Display message
        this.showMessage.emit(this.resData.body.message);
        /// If Status is true then store seller data in localstorage and send feedback to auth-guard to access secure route
        if (serStatus) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem(
            'seller',
            JSON.stringify(this.resData.body.seller)
          );
        } else {
          /// If Status is false send feedback to auth-guard to restrict to access secure route
          this.isSellerLoggedIn.next(false);
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['sellerhome']);
    }
  }
}
