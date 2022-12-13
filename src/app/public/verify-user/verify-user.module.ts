import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyUserRoutingModule } from './verify-user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LeftSectionModule } from '../common/left-section/left-section.module';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../../private/common/header/header.module';
import { VerifyUserComponent } from './verify-user.component';


@NgModule({
  declarations: [VerifyUserComponent],
  imports: [
    CommonModule,
    VerifyUserRoutingModule,
    HttpClientModule,
    LeftSectionModule,
    FormsModule,
    HeaderModule

  ]
})
export class VerifyUserModule { }
