import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountGeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { ProfileModule } from '../../_shared/profile/profile.module';
import { GeneralTrainingComponent } from './general-training/general-training.component';
import { OrganizationModule } from '../organization/organization.module';
import { AttendeeViewComponent } from './attendee-view/attendee-view.component';
import { OrganizerViewComponent } from './organizer-view/organizer-view.component';
import { NgPrimeModule } from '../../_forms/prime.module';
import { CredentialsComponent } from './general-profile/credentials/credentials.component';
import { GeneralBasicComponent } from './general-profile/general-basic/general-basic.component';
@NgModule({
  declarations: [GeneralComponent, GeneralProfileComponent, GeneralTrainingComponent, AttendeeViewComponent, OrganizerViewComponent, CredentialsComponent, GeneralBasicComponent],
  imports: [
    CommonModule, AccountGeneralRoutingModule, ProfileModule, OrganizationModule, NgPrimeModule
  ]
})
export class AccountGeneralModule { }
