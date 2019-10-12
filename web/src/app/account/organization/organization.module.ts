import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { AccountOrganizationRoutingModule } from './organization-routing.module';
import { OrganizationBankDetailComponent } from './organization-bank-detail/organization-bank-detail.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import {FormModule} from '../../_forms/form/form.module'
import { ProfileModule } from '../../_shared/profile/profile.module';
import { CommunicationComponent } from './communication/communication.component';
@NgModule({
  declarations: [OrganizationComponent, OrganizationBankDetailComponent, OrganizationProfileComponent, CommunicationComponent],
  imports: [
    CommonModule, AccountOrganizationRoutingModule, ProfileModule, FormModule
  ],
  exports: [
    OrganizationBankDetailComponent
  ]

})
export class OrganizationModule { }
