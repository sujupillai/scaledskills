import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { LoginConfirmComponent } from './login-confirm/login-confirm.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
const authRoutes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'userValidate', component: LoginConfirmComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
