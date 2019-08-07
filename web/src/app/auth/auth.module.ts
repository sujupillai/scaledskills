import { NgModule } from '@angular/core';
import {FormModule} from '../_forms/form/form.module'
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { SharedService } from '../_service/shared.service';
import {ConfirmationDialogComponent} from '../_shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent, ConfirmationDialogComponent],
  imports: [
    AuthRoutingModule,
    FormModule,
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [SharedService]
})
export class AuthModule { }
