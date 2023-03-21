import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  resData: any = [];
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  successStatus = new EventEmitter<boolean>(false);
  showMessage = new EventEmitter<string>();

  constructor(private router: Router, private httpClient: HttpClient) {}

  /// Signup Function
  userSignUp(userSignUp: UserModel) {
    this.httpClient
      .post('http://localhost:4700/user/signup', userSignUp, {
        observe: 'response',
      })
      .subscribe((res) => {
        /// Get Response in resData
        this.resData = res;
        /// Check Status from Server side
        var serverStatus = this.resData.body.status;
        /// Send Status to User-auth Component for Further Action
        this.successStatus.emit(serverStatus);
        /// Send Message to User-auth Component for Display message
        this.showMessage.emit(this.resData.body.message);
        /// If Status is true then store User data in localstorage and send feedback to auth-guard to access secure route
        if (serverStatus) {
          this.isUserLoggedIn.next(true);
          localStorage.setItem('user', JSON.stringify(this.resData.body.user));
        } else {
          /// If Status is false send feedback to auth-guard to restrict to access secure route
          this.isUserLoggedIn.next(false);
        }
      });
  }

  /// User Log In function
  userLogin(userLoginData: UserModel) {
    return this.httpClient
      .post('http://localhost:4700/user/login', userLoginData, {
        observe: 'response',
      })
      .subscribe((res) => {
        /// Get Response in resData
        this.resData = res;
        /// Check Status from Server side
        var serverStatus = this.resData.body.status;
        /// Send Status to User-auth Component for Further Action
        this.successStatus.emit(serverStatus);
        /// Send Message to User-auth Component for Display message
        this.showMessage.emit(this.resData.body.message);
        /// If Status is true then store User data in localstorage and send feedback to auth-guard to access secure route
        if (serverStatus) {
          this.isUserLoggedIn.next(true);
          localStorage.setItem('user', JSON.stringify(this.resData.body.user));
        } else {
          /// If Status is false send feedback to auth-guard to restrict to access secure route
          this.isUserLoggedIn.next(false);
        }
      });
  }

  reloadUser() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
