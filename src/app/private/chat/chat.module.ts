import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { HeaderModule } from '../common/header/header.module';
import { NavbarModule } from '../common/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    HeaderModule,
    NavbarModule,
    HttpClientModule, 
    FormsModule,
    ChartModule,
  ],
  exports:[ChatComponent],
  providers:[]
})
export class ChatModule { }
