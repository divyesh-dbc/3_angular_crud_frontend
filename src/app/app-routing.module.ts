import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { LayoutModule } from './private/layout.module';
import { LoginModule } from './public/login/login.module';
import { SignupModule } from './public/signup/signup.module';
import { ForgetpasswordModule } from './public/forgetpassword/forgetpassword.module';
import { ResetpasswordModule } from './public/resetpassword/resetpassword.module';
import { VerifyUserModule } from './public/verify-user/verify-user.module';

const routes: Routes = [
  {path: '', loadChildren: () => LayoutModule, canActivate: [AuthGuard]},
  {path: 'login', loadChildren: () => LoginModule, canActivate: [AuthGuard] }, 
  {path: 'signup', loadChildren: () => SignupModule, canActivate: [AuthGuard] }, 
  {path: 'forgotpassword', loadChildren: () => ForgetpasswordModule}, 
  {path: 'resetpassword', loadChildren: () => ResetpasswordModule}, 
  {path: 'verifyuser', loadChildren: () => VerifyUserModule}, 
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
