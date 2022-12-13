import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { UploadmodalComponent } from '../uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  
})
export class NavbarComponent {
  pageName: string = '';
  constructor(
    public authService: AuthService,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }
  ngOnInit() {}

  onLoggedout() {
    this.authService.logOut();
  }
  openModal() {
    this.modalService.open(UploadmodalComponent);
  }
  openChangePassword(){
    this.modalService.open(ChangepasswordComponent,{size: 'sm',centered: true});
    
  }
}
