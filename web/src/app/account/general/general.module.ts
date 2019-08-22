import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountGeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { FormModule } from '../../_forms/form/form.module';
import { ProfileModule } from '../../_shared/profile/profile.module';
@NgModule({
  declarations: [GeneralComponent, GeneralProfileComponent],
  imports: [
    CommonModule, AccountGeneralRoutingModule, FormModule, ProfileModule
  ]
})
export class AccountGeneralModule { }
