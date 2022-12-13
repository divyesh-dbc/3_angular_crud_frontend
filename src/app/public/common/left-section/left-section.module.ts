import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftSectionComponent } from './left-section.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule],
  declarations: [LeftSectionComponent],
  exports: [LeftSectionComponent],
  providers: [AuthService],
})
export class LeftSectionModule {}
