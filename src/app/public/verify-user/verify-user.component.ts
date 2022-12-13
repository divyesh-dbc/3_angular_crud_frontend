import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegexService } from 'src/app/shared/services/regex.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit{
  step: number = 1;
  error: any;
  msg: any;
  status: any;
  isSubmitted = false;
  isLoading: any = false;
  resetData = { status:"",token:""};

  constructor(
    public router: Router,
    private authService: AuthService,
  
  ) {
    
    // this.authService
    //   .validateResetToken(
    //     this.router.routerState.snapshot.root.queryParams['token']
    //   )
    //   .subscribe(
    //     (success) => {},
    //     (err) => {
    //       this.error=err.error;
    //       this.status = err.error.code;
    //         this.msg = err.error.message;
    //       this.step = 3;
    //       console.log(" this.msg",  this.msg);
    //     }
    //   );
  }
  ngOnInit() {
    this.msg="";

    this.isSubmitted = true;

      this.authService
        .statusUpdate(
          this.resetData,
          this.router.routerState.snapshot.root.queryParams['token']
        )
        .subscribe(
          (success) => {
            this.step = 1;
          },
          (err) => {
            this.error = err.error;
            this.status = err.error.code;
            this.msg = err.error.message;
            this.isLoading = false;
            this.step=3;
            console.log("this.msg", this.msg);
          }
        );
  }
    }


