import { NgModule } from '@angular/core';
import { NgPrimeModule } from '../_forms/prime.module'
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { SharedService } from '../_service/shared.service';
import { SharedModule } from '../_shared/shared.module';
import { LoginConfirmComponent } from './login-confirm/login-confirm.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent, LoginConfirmComponent, ForgotPasswordComponent, SetpasswordComponent],
  imports: [
    AuthRoutingModule, NgPrimeModule, SharedModule
  ],

  providers: [SharedService]
})
export class AuthModule { }
