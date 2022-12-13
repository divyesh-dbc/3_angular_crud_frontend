import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HeaderModule } from '../common/header/header.module';
import { NavbarModule } from '../common/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NavbarModule,
    HeaderModule,
    HttpClientModule,
    FormsModule,
    ChartModule
  ],
  exports:[UsersComponent],
  providers:[]
})
export class UsersModule { }
