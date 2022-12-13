import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UseractiveComponent } from './useractive.component';

const routes: Routes = [
  { path: '', component: UseractiveComponent }  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseractiveRoutingModule { }
