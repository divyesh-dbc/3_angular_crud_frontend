import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { RegexService } from 'src/app/shared/services/regex.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { DashboardComponent } from 'src/app/private/dashboard/dashboard.component';
import { ApiService } from 'src/app/shared/services/api.service';
import * as _moment from 'moment';
import { window } from 'rxjs';
const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  itemData = {
    email: '', password: ''
  };
    error:any;
    msg:any;
    status:any;
  emailPattern: RegExp;
  passwordPattern: RegExp;
  showPassword = false;
  isSubmitted = false;
  closeResult = '';
  isLoading: any = false;
//   onSubmit(f: NgForm) {
//     console.log('asd', f.value); // { first: '', last: '' }
//     console.log(f.valid); // false
//   }

  constructor(
    private regexService: RegexService,
    public router: Router,
    private authService: AuthService,
    public menuService: MenuService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) {
    this.emailPattern = regexService.pattern.emailPattern;
    this.passwordPattern = regexService.pattern.passwordPattern;
    this.authService.userDetail = { email: '', password: '' };
  }
  ngOnInit() {}
  onLoggedin(f: NgForm) {
    this.msg="";
      console.log('asd', f.value); // { first: '', last: '' }
      console.log(f.valid); // false
      
    this.isSubmitted = true;
    this.isLoading = true;
    this.authService.checkLogin(this.itemData).subscribe(
      (success) => {
       
        localStorage.setItem('tokenExpired', moment.utc().unix());
        localStorage.setItem('authToken', success['data'][0].token);
        localStorage.setItem('user', success['data'][0].user);
        this.router.navigate(['dashboard']);

        this.isLoading = false;
      },
      (err) => {
        console.error("error",err);
        this.error=err.error;
        this.status=err.error.code;
        this.msg=err.error.message;
        console.log("this.error", this.error);
        console.log("this.msg", this.msg);
        this.isLoading = false;
        document.getElementById('password')?.focus();
      }
    );
  }

  openModal() {
    // const modalRef = this.modalService.open(ReportIssueComponent);
    //compConst.componentInstance.weight = undefined;
    // modalRef.componentInstance.openFrom = 'login';
  }
  /* 
    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    async fileChangeEvent(fileInput: any) {

        if ((fileInput.target.files as Array<File>).length > 5 || this.reportData.image.length >= 5) {
            fileInput.srcElement.value = null;
            Swal.fire({
                icon: 'error',
                // title: '',
                text: 'Max 5 images allow to upload',
                showCancelButton: false,
                confirmButtonText: 'OK'
            }).then((result) => {
            });
            return true;
        } else {
            if (fileInput.target.files.length) {
                const element: File = fileInput.target.files[0];

                const ext = element.name.substring(element.name.lastIndexOf('.'));
                if (this.accept_file['image'].findIndex((item: any) => item.toLowerCase() == ext.toLowerCase()) < 0) {
                    fileInput.srcElement.value = null;
                    Swal.fire({
                        icon: 'error',
                        // title: '',
                        text: `Please select the appropriate ${'image'} with respective format (${this.accept_file['image'].toString()}).`,
                        showCancelButton: false,
                        confirmButtonText: 'OK'
                    }).then((result) => {
                    });
                    return true;
                } else {
                    if (element.size > this.allowMaxFileSize && this.accept_file['image'].findIndex((item: any) => item == ext.toLowerCase()) >= 0) {
                        fileInput.srcElement.value = null;
                        Swal.fire({
                            icon: 'error',
                            // title: '',
                            text: `Ensure that the size of Image is not more than ${this.allowMaxFileSize / 1024} KB and preferred dimension 800*450.`,
                            showCancelButton: false,
                            confirmButtonText: 'OK'
                        }).then((result) => {
                        });
                        return true;
                    }

                    const file = element;
                    const reader = new FileReader();
                    reader.onload = e => {
                        this.imageSrc = reader.result;
                        let item: Object = {
                            file: fileInput.target.files,
                            file_name: element.name,
                            file_src: this.imageSrc,
                        };
                        this.reportData.image = item;
                        console.log('this.reportData.image', this.reportData.image);

                    }
                    reader.readAsDataURL(file);
                    return true;
                }
            } else {
                return true;
            }
        }
    }
    removeFile() {
        this.reportData.image = {};
    }
    submitReportIssue(form: NgForm) {

        console.log('onSave', this.reportData);
        if (this.reportData.image.length < 1) {
            Swal.fire({
                icon: 'error',
                // title: '',
                text: "Image  is required",
                showCancelButton: false,
                confirmButtonText: 'OK'
            }).then((result) => {
            });
            return true;
        }
        this.loader.setLoading(true);
        const formData = new FormData();

        formData.append('report_category', this.reportData.report_category);
        formData.append('name', this.reportData.name);
        formData.append('email', this.reportData.email);
        formData.append('phone', this.reportData.phone);
        formData.append('description', this.reportData.description);

        if (this.reportData.image.file && this.reportData.image.file.length) {
            formData.append('image', this.reportData.image.file[0], this.reportData.image.file[0]['name']);
        }

        this.apiService.postFileData(constant.SAVE_REPORT_ISSUE, formData).subscribe((res: any) => {
            Swal.fire({
                icon: res.status,
                text: res.message,
                showCancelButton: false,
                confirmButtonText: 'OK'
            }).then((result) => {
                if (res.code === 200) {
                    form.resetForm();
                }
            });
            this.loader.setLoading(false);
            this.getDismissReason('submitted');
            return true;
        },
            (err: any) => {
                Swal.fire({
                    icon: 'error',
                    text: err.error['message'],
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                }).then((result) => {
                });
                return true;
                this.loader.setLoading(false);
            }
        );
        return true;
    } */
}
