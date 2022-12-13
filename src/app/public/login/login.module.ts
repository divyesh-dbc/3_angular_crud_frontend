import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from './login.component';
import { LeftSectionModule } from "../common/left-section/left-section.module";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [LoginComponent],
    imports: [
      CommonModule,
      LoginRoutingModule,
      LeftSectionModule,
      HttpClientModule, 
      FormsModule
    ],
    exports: [],
    providers: [AuthService],
})
export class LoginModule { }
