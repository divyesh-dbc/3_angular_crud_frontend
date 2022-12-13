import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignupComponent } from './signup.component';
import { LeftSectionModule } from '../common/left-section/left-section.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    LeftSectionModule,
    HttpClientModule,
    
    FormsModule

  ],
  providers:[AuthService]
})
export class SignupModule { }
