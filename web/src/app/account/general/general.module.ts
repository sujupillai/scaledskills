import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountGeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { FormModule } from '../../_forms/form/form.module';
import { ProfileModule } from '../../_shared/profile/profile.module';
import { GeneralTrainingComponent } from './general-training/general-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { FeatureTrainingComponent } from './feature-training/feature-training.component';
import { CancelTrainingParticipationComponent } from './cancel-training-participation/cancel-training-participation.component';
import { NguCarouselModule } from '@ngu/carousel';
import { OrganizationModule } from '../organization/organization.module';
import { AttendeeViewComponent } from './attendee-view/attendee-view.component';
import { OrganizerViewComponent } from './organizer-view/organizer-view.component';
import {NgPrimeModule} from '../../_forms/prime.module'

@NgModule({
  declarations: [GeneralComponent, GeneralProfileComponent, GeneralTrainingComponent, PastTrainingComponent, FeatureTrainingComponent, CancelTrainingParticipationComponent, AttendeeViewComponent, OrganizerViewComponent],
  imports: [
    CommonModule, AccountGeneralRoutingModule, FormModule, ProfileModule, NguCarouselModule, OrganizationModule, NgPrimeModule
  ]
})
export class AccountGeneralModule { }
