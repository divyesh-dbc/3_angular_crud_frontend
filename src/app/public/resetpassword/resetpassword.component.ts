import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegexService } from 'src/app/shared/services/regex.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  step: number = 1;
  showPassword = false;
  showCPassword = false;
  resetData = { password: '', cpassword: '' };
  passwordPattern: RegExp;
  error: any;
  msg: any;
  status: any;
  isSubmitted = false;
  isLoading: any = false;

  // this.error=err.error;
  // this.msg=err.error.message;

  constructor(
    public router: Router,
    private authService: AuthService,
    private regexService: RegexService
  ) {
    this.passwordPattern = regexService.pattern.passwordPattern;
    // this.authService
    //   .validateResetToken(
    //     this.router.routerState.snapshot.root.queryParams['token']
    //   )
    //   .subscribe(
    //     (success) => {},
    //     (err) => {
    //       this.status = err.error.code;
    //         this.msg = err.error.message;
    //       this.step = 3;
    //     }
    //   );
  }

  ngOnInit() {}

  onResetPassword() {
    this.msg="";

    if (this.resetData.password === this.resetData.cpassword) {
      this.isSubmitted = true;

      this.authService
        .resetPassword(
          this.resetData,
          this.router.routerState.snapshot.root.queryParams['token']
        )
        .subscribe(
          (success) => {
            this.step = this.step + 1;
          },
          (err) => {
            this.error = err.error;
            this.status = err.error.code;
            this.msg = err.error.message;
            this.step=3;
            this.isLoading = false;
            console.log("this.msg", this.msg);
          }
        );
    }
  }
  // nextPage() {
  //   this.step = this.step + 1;
  // }
}
