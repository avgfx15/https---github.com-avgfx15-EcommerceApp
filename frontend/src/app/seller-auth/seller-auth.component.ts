import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel, SellerModel } from '../model/seller';
import { SellerServices } from '../services/seller-services.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  isDisabled: boolean = false;
  showMessage: string = '';
  success: boolean = true;
  showLogin: boolean = true;
  constructor(private sellerServices: SellerServices, private router: Router) {}

  ngOnInit(): void {
    this.sellerServices.reloadSeller();
  }

  /// Sign Up form Submit Finction
  signUp(signupSellerData: SellerModel) {
    this.sellerServices.sellerSignUp(signupSellerData);
    /// Get Stutus fron Backend by sellerServices component
    this.sellerServices.successStatus.subscribe((status) => {
      /// If Status is true then show message from backend save seller data in localstorage and redirect to sellerhome route
      if (status) {
        this.isDisabled = true;
        this.success = true;
        this.sellerServices.showMessage.subscribe((message) => {
          this.showMessage = message;
        });
        setTimeout(() => {
          this.isDisabled = false;
          this.router.navigate(['sellerhome']);
        }, 3000);
      } else {
        /// If Status is false then show message from backend restrict to access secure route
        this.isDisabled = true;
        this.success = false;
        this.sellerServices.showMessage.subscribe((message) => {
          this.showMessage = message;
        });
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      }
    });
  }

  /// Toggle to show Sign Up form or Login Form - Login Form is By default
  openToggleForm() {
    this.showLogin = !this.showLogin;
  }
  /// Login form Submit Finction
  loginForm(sellerLogin: LoginModel) {
    this.sellerServices.sellerLogin(sellerLogin);
    /// Get Stutus fron Backend by sellerServices component
    this.sellerServices.successStatus.subscribe((status) => {
      /// If Status is true then show message from backend save seller data in localstorage and redirect to sellerhome route
      if (status) {
        this.isDisabled = true;
        this.success = true;
        this.sellerServices.showMessage.subscribe((message) => {
          this.showMessage = message;
        });
        setTimeout(() => {
          this.isDisabled = false;
          this.router.navigate(['sellerhome']);
        }, 3000);
      } else {
        /// If Status is false then show message from backend restrict to access secure route
        this.isDisabled = true;
        this.success = false;
        this.sellerServices.showMessage.subscribe((message) => {
          this.showMessage = message;
        });
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      }
    });
  }
}
