import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { constant } from 'src/app/constant';
import Swal from 'sweetalert2';
import { environment } from 'src/app/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegexService } from 'src/app/shared/services/regex.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  base_url = environment.pathUrl;
  emailPattern: RegExp;
  today:any;
  userDetail: any = {  
  id:'',
  first_name:'',
  last_name:'',
  email:'',
  mobile:'',
  gender:'',
  date1:'',
  address:'',
  city:'',
  pin:'',
  state:'',
  qualification:'',
  specialization:'',
   user_image:{file_src:''}
 };
  accept_file: any = {
      image: [".png", ".jpeg", ".jpg"]
  }
  allowMaxFileSize = 1024000;
  imageSrc: any;
  imageChangedEvent: any = '';
  radioChangeEvent:any='';
  croppedImage: any = '';
  croppedImageBlob: any;
  specializationList = [
    { name: 'computerscience', title:"Computer Science", checked:false },
    { name: 'informationtechnology', title:"Information Technology", checked:false },
    { name: 'computerarchitecture', title:"Computer Architecture", checked:false },
    { name: 'telecommunication', title:"Tele Communication", checked:false },
    
  ];

  constructor(public authService: AuthService, public ref: ChangeDetectorRef,  public regexService: RegexService, public apiService: ApiService, private modalService: NgbModal) {
    this.emailPattern = regexService.pattern.emailPattern;
    this.getUserDetails();
}

ngOnInit() {
}

getUserDetails(){
  this.authService.getUserDetail().subscribe((success: any) => {
    this.userDetail = success.data.userDetails;
    // this.today = new Date(this.userDetail.date1);
    this.userDetail.specialization = this.userDetail.specialization.split(",");
    for (let index = 0; index < this.userDetail.specialization.length; index++) {
      const ind = this.specializationList.findIndex((item: any) => item.name == this.userDetail.specialization[index]);
      if(ind > -1) {
        this.specializationList[ind].checked = true;
      }
    }
      //  this.userDetail.specialization = true
    if (!this.userDetail.user_image.file_name) {
        let item1: Object = {
            file: '',
            file_name: this.userDetail.user_image,
            file_src: this.base_url + 'upload/profile/' + this.userDetail.user_image,
        };
        this.userDetail.user_image = item1;
    }
    // this.userDetail = authService.userDetail;
},
    err => {
       
          console.log("err", err);
            this.authService.logOut();
        
    });
}
async fileChangeEvent(fileInput: any , content:any) {
  this.imageChangedEvent = fileInput;
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true }).result.then((result) => {
    // this.closeResult = `Closed with: ${result}`;
}, (reason) => {
    // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
}

async radiobtnChange( e:any) {
  
  this.userDetail.gender = e.target.value;
  
}
removeFile() {
  this.userDetail.user_image = {};
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
  reader.onload = e => {
      let item: Object = {
          file: [file],
          file_name: this.imageChangedEvent.target.files[0].name,
          file_src: this.croppedImage,
          
      };
      
      this.userDetail.user_image = item;
  }
  reader.readAsDataURL(file);
}
saveItem(f: NgForm) {
  console.log('onSave', this.userDetail);
  const selectedOrderIds = this.specializationList.filter((item:any)=>item.checked).map((item:any)=>item.name)

  
  const formData = new FormData();

  formData.append('id', this.userDetail.id);
  formData.append('first_name', this.userDetail.first_name);
  formData.append('last_name', this.userDetail.last_name);
  formData.append('email', this.userDetail.email);
  formData.append('mobile', this.userDetail.mobile);
  formData.append('gender', this.userDetail.gender);
  formData.append('date1', this.userDetail.date1);
  formData.append('address', this.userDetail.address);
  formData.append('city', this.userDetail.city);
  formData.append('pin', this.userDetail.pin);
  formData.append('state', this.userDetail.state);
  formData.append('qualification', this.userDetail.qualification);
  formData.append('specialization', selectedOrderIds.toString());
  formData.append('reset_request', '0');
  formData.append('status', 'active');
  // if (this.imageChangedEvent && this.imageChangedEvent.length) {
  //     formData.append('user_image', this.imageChangedEvent.file[0], this.imageChangedEvent.file_name);
    // }

  if (this.userDetail.user_image.file && this.userDetail.user_image.file.length) {
    formData.append('user_image', this.userDetail.user_image.file[0], this.userDetail.user_image.file_name);
}

  this.apiService.postFileData(constant.SAVE_USERS, formData).subscribe((res: any) => {
      this.authService.userDetail.user_image = '';
      this.getUserDetails();
      this.ref.detach();
      setInterval(() => { this.ref.detectChanges(); }, 5000);

      Swal.fire({
        icon: res.status,
        text: res.message,
        showCancelButton: false,
        confirmButtonText: 'OK'
    }).then((result) => {
    });
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
      }
  );
  return true;
}
cancelProfileEdit() {
  window.history.back();
}

}
