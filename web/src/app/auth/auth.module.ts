import { NgModule } from '@angular/core';
import {NgPrimeModule} from '../_forms/prime.module'
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { SharedService } from '../_service/shared.service';
import {ConfirmationDialogComponent} from '../_shared/confirmation-dialog/confirmation-dialog.component';
@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent, ConfirmationDialogComponent],
  imports: [
    AuthRoutingModule, NgPrimeModule,
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [SharedService]
})
export class AuthModule { }
