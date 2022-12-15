import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserRoutingModule } from './create-user-routing.module';
import { CreateUserComponent } from './create-user.component';
import { HeaderModule } from '../common/header/header.module';
import { NavbarModule } from '../common/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    CreateUserRoutingModule,
    HeaderModule,
    NavbarModule,
    HttpClientModule, 
    FormsModule,
    ChartModule,
  ImageCropperModule
  ],
  exports:[CreateUserComponent],
  providers:[]
})
export class CreateUserModule { }
