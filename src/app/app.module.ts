import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MenuResolve } from './shared/services/menu.resolve';
import { AuthRoleGuard } from './shared/guard/auth.role.guard';
import { MyInterceptor } from './shared/guard/auth.interceptor';

// import { LoginComponent } from './public/login/login.component';
// import { SignupComponent } from './public/signup/signup.component';
// import { LeftSectionComponent } from './public/common/left-section/left-section.component';
// import { ForgetpasswordComponent } from './public/forgetpassword/forgetpassword.component';
// import { ResetpasswordComponent } from './public/resetpassword/resetpassword.component';
// import { DashboardComponent } from './private/dashboard/dashboard.component';
// import { LayoutComponent } from './private/layout.component';
// import { HeaderComponent } from './private/common/header/header.component';
// import { UseractiveComponent } from './public/useractive/useractive.component';
// import { VerifyUserComponent } from './public/verify-user/verify-user.component';
// import { SidebarComponent } from './private/common/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './private/profile/profile.component';



@NgModule({
    declarations: [
        AppComponent,
        
         
       
        // SignupComponent,
        // ForgetpasswordComponent,
        // ResetpasswordComponent,
        // SidebarComponent,
        // NavbarComponent,
    ],
    providers: [AuthGuard, MenuResolve, AuthRoleGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyInterceptor,
            multi: true,
        }],
    bootstrap: [AppComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule,NgbModule]
})
export class AppModule {}
