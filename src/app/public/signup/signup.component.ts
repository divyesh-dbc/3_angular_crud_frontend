import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { constant } from 'src/app/constant';
import { environment } from 'src/app/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegexService } from 'src/app/shared/services/regex.service';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  step: number = 1;
  error: any;
  msg: any;
  showPassword = false;
  showCPassword = false;
  base_url = environment.pathUrl;
  isLoading: any = false;
  emailPattern: RegExp;
  passwordPattern: RegExp;
  userDetail: any = {
    password: 'Dev@1234',
    cpassword: 'Dev@1234',
    first_name: 'dev11',
    last_name: '12311',
    email: 'mydeveloper14+1@gmail.com',
  };
  isSubmitted = false;
  status: any;
  userId: number = 0;
  enable = false;
  countDown = 0;

  // accept_file: any = {
  //     image: [".png", ".jpeg", ".jpg"]
  // }
  // allowMaxFileSize = 1024000;
  // imageSrc: any;

  // imageChangedEvent: any = '';
  // croppedImage: any = '';
  // croppedImageBlob: any;

  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    private modalService: NgbModal,
    public regexService: RegexService,
    public router: Router
  ) {
    this.emailPattern = regexService.pattern.emailPattern;
    this.passwordPattern = regexService.pattern.passwordPattern;
  }
  ngOnInit() {}
  clearForm() {
    this.userDetail = {
      password: '',
      cpassword: '',
      first_name: '',
      last_name: '',
      email: '',
    };
  }
  /* Start create content code */

  // onSubmit(){
  //   console.log('asd',f.value);  // { first: '', last: '' }
  //   console.log(f.valid);

  // }

  onRegister(f: NgForm) {
    this.msg="";

    if (this.userDetail.password === this.userDetail.cpassword) {
      this.isSubmitted = true;
      console.log('onSave', this.userDetail);

      const data = JSON.parse(JSON.stringify(this.userDetail));
      data.password = crypto.AES.encrypt(
        data.password,
        environment.encryptionKey
      ).toString();

      // this.loader.setLoading(true);
      const formData = new FormData();

      formData.append('first_name', this.userDetail.first_name);
      formData.append('last_name', this.userDetail.last_name);
      formData.append('email', this.userDetail.email);
      formData.append('password', data.password);

      this.apiService.postFileData(constant.SAVE_USERS, formData).subscribe(
        (res: any) => {
          if (this.step < 2) {
            this.step++;
          }
          this.setCountdown();
          this.userId = res.data;
          return true;
        },
        (err: any) => {
          this.error = err.error;
          this.msg = err.error.message;
          return true;
        }
      );
    }
    return true;
  }
  setCountdown() {
    this.countDown = 10;
    const intv = setInterval(() => {
      this.countDown = this.countDown - 1;
      if (!this.countDown) {
        this.enable = true;
        clearInterval(intv);
      }
    }, 1000);
  }
  onResendMail() {
    this.msg="";

    this.enable = false;
    this.authService.resendEmail(this.userId).subscribe(
      (success) => {
        this.step = 2;
        this.setCountdown()
      },
      (err) => {
        this.error = err.error;
        this.status = err.error.code;
        this.msg = err.error.message;
        this.isLoading = false;

        console.log('this.msg', this.msg);
      }
    );
  }
}
