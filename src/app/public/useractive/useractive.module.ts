import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UseractiveRoutingModule } from './useractive-routing.module';
import { UseractiveComponent } from './useractive.component';
import { HeaderModule } from 'src/app/private/common/header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LeftSectionModule } from '../common/left-section/left-section.module';


@NgModule({
  declarations: [UseractiveComponent],
  imports: [
    CommonModule,
    HeaderModule,
    HttpClientModule, 
    LeftSectionModule,
    FormsModule,
    UseractiveRoutingModule
  ]
})
export class UseractiveModule { }
