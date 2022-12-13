import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from 'src/app/private/common/header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../common/navbar/navbar.module';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderModule,
    NavbarModule,
    HttpClientModule, 
    FormsModule,
    ChartModule,
    
  ],
  exports:[]
})
export class DashboardModule { }
