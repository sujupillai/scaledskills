import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../_material/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../_service/shared.service';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    MatNativeDateModule,
  ],
  providers: [SharedService]
})
export class AuthModule { }
