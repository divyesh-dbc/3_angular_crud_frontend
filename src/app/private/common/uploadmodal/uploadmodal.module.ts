import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadmodalRoutingModule } from './uploadmodal-routing.module';
import { UploadmodalComponent } from './uploadmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [UploadmodalComponent],
  imports: [
    CommonModule,
    UploadmodalRoutingModule
  ],
  providers:[NgbModal],
  exports:[UploadmodalComponent]
})
export class UploadmodalModule { }
