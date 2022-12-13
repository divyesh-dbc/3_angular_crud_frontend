import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { HeaderModule } from '../common/header/header.module';
import { NavbarModule } from '../common/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { ProfileComponent } from './profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HeaderModule,
    NavbarModule,
    HttpClientModule, 
    FormsModule,
    ChartModule,
  ImageCropperModule
  ],
  exports:[ProfileComponent],
  providers:[]
})
export class ProfileModule { }
