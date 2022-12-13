import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetpasswordRoutingModule } from './forgetpassword-routing.module';
import { ForgetpasswordComponent } from './forgetpassword.component';
import { LeftSectionModule } from '../common/left-section/left-section.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';


@NgModule({
  declarations: [ForgetpasswordComponent],
  imports: [
    CommonModule,
    ForgetpasswordRoutingModule,
    LeftSectionModule,
    HttpClientModule,
    FormsModule,
  ],
  exports:[ForgetpasswordComponent],
  providers: [AuthService],


})
export class ForgetpasswordModule { }
