import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarModule } from './common/sidebar/sidebar.module';
import { NavbarModule } from './common/navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SidebarModule,
    NavbarModule,
    HttpClientModule,
    FormsModule,
    
  ],
  exports:[LayoutComponent],

})
export class LayoutModule {}
