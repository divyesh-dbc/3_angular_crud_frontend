import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { MenuResolve } from '../shared/services/menu.resolve';
import { LayoutComponent } from './layout.component';
import { UseractiveModule } from '../public/useractive/useractive.module';
import { ChangepasswordModule } from './common/changepassword/changepassword.module';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule,
        resolve: { menu: MenuResolve },
      },
      {
        path: 'useractive',
        loadChildren: () => UseractiveModule,
        resolve: { menu: MenuResolve },
      },
      {
        path: 'profile',
        loadChildren: () => ProfileModule,
        resolve: { menu: MenuResolve },
      },
      {
        path: 'users',
        loadChildren: () => UsersModule,
        resolve: { menu: MenuResolve },
      },
      {
        path: 'chat',
        loadChildren: () => ChatModule,
        resolve: { menu: MenuResolve },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
