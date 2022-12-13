import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetpasswordRoutingModule } from './resetpassword-routing.module';
import { ResetpasswordComponent } from './resetpassword.component';
import { LeftSectionModule } from '../common/left-section/left-section.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/shared/services/auth.service';


@NgModule({
  declarations: [ResetpasswordComponent],
  imports: [
    CommonModule,
    ResetpasswordRoutingModule,
    LeftSectionModule,
    HttpClientModule,
    FormsModule,
    
  ],
  exports:[ResetpasswordComponent],
  providers:[AuthService]
})
export class ResetpasswordModule {
  
 }
