import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HeaderModule } from '../common/header/header.module';
import { NavbarModule } from '../common/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserModule } from '../create-user/create-user.module';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NavbarModule,
    HeaderModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    NgxPaginationModule,
    SharedPipesModule,
    NgbModule,
    CreateUserModule
  ],
  exports:[UsersComponent],
  providers:[AuthService]
})
export class UsersModule { }
