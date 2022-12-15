import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { constant } from 'src/app/constant';
import { environment } from 'src/app/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegexService } from 'src/app/shared/services/regex.service';
import Swal from 'sweetalert2';
import * as crypto from 'crypto-js';
import * as moment from 'moment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  base_url = environment.pathUrl;
  emailPattern: RegExp;
  maxDate:any
  should_open = false;
  saveType: any = 1;
  userDetail: any = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    gender: '',
    date1: '',
    address: '',
    city: '',
    pin: '',
    state: '',
    qualification: '',
    specialization: '',
    user_image: { file_src: '' },
  };
  userItem: any = {
  };
  accept_file: any = {
    image: ['.png', '.jpeg', '.jpg'],
  };
  allowMaxFileSize = 1024000;
  imageSrc: any;
  imageChangedEvent: any = '';
  radioChangeEvent: any = '';
  croppedImage: any = '';
  croppedImageBlob: any;
  

  constructor(
    public authService: AuthService,
    public ref: ChangeDetectorRef,
    public regexService: RegexService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) {
    this.emailPattern = regexService.pattern.emailPattern;
    // this.getUserDetails();
  }

  ngOnInit() {
    this.maxDate = moment(new Date()).format('YYYY-MM-DD')
    /* if(this.authService.userItem.id){
      this.authService.userItem.specialization =
          this.authService.userItem.specialization.split(',');
        for (
          let index = 0;
          index < this.authService.userItem.specialization.length;
          index++
        ) {
          const ind = this.authService.specializationList.findIndex(
            (item: any) => item.name == this.authService.userItem.specialization[index]
          );
          if (ind > -1) {
            this.authService.specializationList[ind].checked = true;
          }
        }
        console.log("this.authService.userItem.user_image.file_name", this.authService.userItem.user_image.file_name);
        if (!this.authService.userItem.user_image.file_name) {
          let item1: Object = {
            file: '',
            file_name: this.authService.userItem.user_image,
            file_src:
              this.base_url + 'upload/profile/' + this.authService.userItem.user_image,
          };
          this.authService.userItem.user_image = item1;
        }
      } */
       
    
    
  }
  ngOnDestroy() {}

  /* getUserDetails() {
    this.authService.getUserDetail().subscribe(
      (success: any) => {
        this.authService.userItem = success.data.userDetails;
        // this.today = new Date(this.authService.userItem.date1);
        this.authService.userItem.specialization =
          this.authService.userItem.specialization.split(',');
        for (
          let index = 0;
          index < this.authService.userItem.specialization.length;
          index++
        ) {
          const ind = this.authService.specializationList.findIndex(
            (item: any) => item.name == this.authService.userItem.specialization[index]
          );
          if (ind > -1) {
            this.authService.specializationList[ind].checked = true;
          }
        }
        //  this.authService.userItem.specialization = true
        if (!this.authService.userItem.user_image.file_name) {
          let item1: Object = {
            file: '',
            file_name: this.authService.userItem.user_image,
            file_src:
              this.base_url + 'upload/profile/' + this.authService.userItem.user_image,
          };
          this.authService.userItem.user_image = item1;
        }
        // this.authService.userItem = authService.userDetail;
      },
      (err) => {
        console.log('err', err);
        this.authService.logOut();
      }
    );
  } */
  async fileChangeEvent(fileInput: any, content: any) {
    this.imageChangedEvent = fileInput;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
        centered: true,
      })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  async radiobtnChange(e: any) {
    this.authService.userItem.gender = e.target.value;
  }
  removeFile() {
    this.authService.userItem.user_image = {};
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImageBlob = base64ToFile(this.croppedImage);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  saveCroppedImage() {
    const file = this.croppedImageBlob;
    const reader = new FileReader();
    reader.onload = (e) => {
      let item: Object = {
        file: [file],
        file_name: this.imageChangedEvent.target.files[0].name,
        file_src: this.croppedImage,
      };

      this.authService.userItem.user_image = item;
    };
    reader.readAsDataURL(file);
  }
  saveItem(f: NgForm) {
    console.log('onSave', this.authService.userItem);
console.log("specializationList", this.authService.specializationList);
    const selectedOrderIds = this.authService.specializationList
      .filter((item: any) => item.checked)
      .map((item: any) => item.name);

    const formData = new FormData();

    formData.append('id', this.authService.userItem.id);
    formData.append('first_name', this.authService.userItem.first_name);
    formData.append('last_name', this.authService.userItem.last_name);
    formData.append('email', this.authService.userItem.email);
    formData.append('mobile', this.authService.userItem.mobile);
    formData.append('gender', this.authService.userItem.gender);
    formData.append('date1', this.authService.userItem.date1);
    formData.append('address', this.authService.userItem.address);
    formData.append('city', this.authService.userItem.city);
    formData.append('pin', this.authService.userItem.pin);
    formData.append('state', this.authService.userItem.state);
    formData.append('qualification', this.authService.userItem.qualification);
    console.log("selectedOrderIds", selectedOrderIds.toString());
    formData.append('specialization', selectedOrderIds.toString());
    const pass = crypto.AES.encrypt(
      'User@123',
      environment.encryptionKey
    ).toString();
    formData.append('password', pass);
    formData.append('reset_request', '0');
    formData.append('status', '');
    // if (this.imageChangedEvent && this.imageChangedEvent.length) {
    //     formData.append('user_image', this.imageChangedEvent.file[0], this.imageChangedEvent.file_name);
    // }
    if (
      this.authService.userItem.user_image.file &&
      this.authService.userItem.user_image.file.length
    ) {
      formData.append(
        'user_image',
        this.authService.userItem.user_image.file[0],
        this.authService.userItem.user_image.file_name
      );
    }
    this.apiService.postFileData(constant.SAVE_USERS, formData).subscribe(
      (res: any) => {
        
        this.authService.userItem.user_image = '';
        // this.getUserDetails();
        this.ref.detach();
        setInterval(() => {
          this.ref.detectChanges();
        }, 5000);

        Swal.fire({
          icon: res.status,
          text: res.message,
          showCancelButton: false,
          confirmButtonText: 'OK',
        }).then((result) => {});
        this.authService.should_open = false;
        this.authService.contentChangeTriggerMsg.next('saved');
        return true;
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          text: err.error['message'],
          showCancelButton: false,
          confirmButtonText: 'OK',
        }).then((result) => {});
        return true;
      }
    );

    return true;
  }
  closeCreate() {
    // window.history.back();

    this.authService.should_open = false;
    this.authService.userItem = {
      id: '',
    };
    window.scrollTo(0, 0);

  }
}
