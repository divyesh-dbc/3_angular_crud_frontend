import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegexService } from 'src/app/shared/services/regex.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit{
  showPassword = false;
  showCPassword = false;
  showCurPassword = false;
  resetData = { current_password:'', password: '', cpassword: '' };
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
    private regexService: RegexService,
    public activeModal: NgbActiveModal
  ) {
    this.passwordPattern = regexService.pattern.passwordPattern;
    
  }

  ngOnInit() {}

  onChangePassword(f: NgForm) {
    this.msg="";

    if (this.resetData.password === this.resetData.cpassword) {
      this.isSubmitted = true;

      this.authService
        .changePassword(
          this.resetData,
         
        )
        .subscribe(
          (success) => {
            this.activeModal.dismiss()
          },
          (err) => {
            this.error = err.error;
            this.status = err.error.code;
            this.msg = err.error.message;
            
            this.isLoading = false;
          }
        );
    }
  }
  onChange() {
    this.msg = "";
  }
}
