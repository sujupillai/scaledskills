import { NgModule } from '@angular/core';
import {FormModule} from '../_forms/form/form.module'
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { SharedService } from '../_service/shared.service';
import {ConfirmationDialogComponent} from '../_shared/confirmation-dialog/confirmation-dialog.component';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent, ConfirmationDialogComponent],
  imports: [
    AuthRoutingModule,
    FormModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [SharedService]
})
export class AuthModule { }
