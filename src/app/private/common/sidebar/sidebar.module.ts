import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { Router } from '@angular/router';


@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    
  ],
  exports:[SidebarComponent]
})
export class SidebarModule { }
