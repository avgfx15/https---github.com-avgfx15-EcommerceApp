import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = false;
  isDisabled: boolean = false;
  showMessage: string = '';
  success: boolean = false;
  resData: any = [];

  constructor(private userServices: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userServices.reloadUser();
  }

  /// Sign Up form Submit Finction
  signUp(userSignUp: UserModel) {
    this.userServices.userSignUp(userSignUp);
    this.userServices.userSignUp(userSignUp);
    /// Get Stutus fron Backend by sellerServices component
    this.userServices.successStatus.subscribe((status) => {
      /// If Status is true then show message from backend save seller data in localstorage and redirect to sellerhome route
      if (status) {
        this.isDisabled = true;
        this.success = true;
        this.userServices.showMessage.subscribe((message) => {
          this.showMessage = message;
        });
        setTimeout(() => {
          this.isDisabled = false;
          this.router.navigate(['/']);
        }, 3000);
      } else {
        /// If Status is false then show message from backend restrict to access secure route
        this.isDisabled = true;
        this.success = false;
        this.userServices.showMessage.subscribe((message) => {
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
  loginForm(userLogin: UserModel) {
    this.userServices.userLogin(userLogin);
    /// Get Stutus fron Backend by userServices component
    this.userServices.successStatus.subscribe((status) => {
      /// If Status is true then show message from backend save user data in localstorage and redirect to home route
      if (status) {
        this.isDisabled = true;
        this.success = true;
        this.userServices.showMessage.subscribe((message) => {
          this.showMessage = message;
        });
        setTimeout(() => {
          this.isDisabled = false;
          this.router.navigate(['/']);
        }, 3000);
      } else {
        /// If Status is false then show message from backend restrict to access secure route
        this.isDisabled = true;
        this.success = false;
        this.userServices.showMessage.subscribe((message) => {
          this.showMessage = message;
        });
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      }
    });
  }
}
