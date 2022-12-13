import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegexService } from 'src/app/shared/services/regex.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {
  step: number = 1;
  // nextPage() {
  //   this.step = this.step + 1;
  // }
  error: any;
  msg: any;
  itemData = { email: '' };
  emailPattern: RegExp;
  isSubmitted = false;
  
 
  constructor(
    public router: Router,
    private authService: AuthService,
    private regexService: RegexService
  ) {
    this.emailPattern = regexService.pattern.emailPattern;
  }

  ngOnInit() {}

 
  onForgot() {
    this.msg="";

    this.isSubmitted = true;
    this.authService.forgotPassword(this.itemData).subscribe((success: any) => {
        if (this.step<2) {
          this.step++;
        } else{
          this.step;
        }
      },
      (err) => {
        console.log(err);
        

        this.error = err.error;
        this.msg = err.error.message;
        console.log("this.error", this.error);
        console.log("this.msg ", this.msg );
      },
      

    );
  }
  // prevPage() {
  //   this.step = this.step - 1;
  // }
//   input = this.itemData.email.toString();
//   regex = /@gmail.com(\w+)/;
//   output = this.input.replace(this.regex, function(match, $1, $2) {
//    // $1: Hello, my password is: 
//    // $2: SecurePassWord
//    // Replace every character in the password with asterisks
//    return $1 + $2.replace(/./g, '*');
//  });
}
