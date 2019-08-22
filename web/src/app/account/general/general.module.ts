import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountGeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
@NgModule({
  declarations: [GeneralComponent, GeneralProfileComponent],
  imports: [
    CommonModule, AccountGeneralRoutingModule
  ]
})
export class AccountGeneralModule { }
