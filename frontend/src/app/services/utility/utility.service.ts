import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isDisabled: boolean = false;
  success: boolean = true;
  // showMessage: string = '';
  // resData: any = [];

  constructor(private router: Router) {}

  statusFalse() {
    this.isDisabled = true;
    this.success = false;
    // this.showMessage = this.resData.message;
    setTimeout(() => {
      this.isDisabled = false;
    }, 3000);
  }

  statusTrue() {
    this.isDisabled = true;
    this.success = true;
    // this.showMessage = this.resData.message;
    setTimeout(() => {
      this.isDisabled = false;
      this.router.navigate(['/']);
    }, 3000);
  }
}
