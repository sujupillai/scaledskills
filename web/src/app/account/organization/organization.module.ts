import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { AccountOrganizationRoutingModule } from './organization-routing.module';
import { OrganizationBankDetailComponent } from './organization-bank-detail/organization-bank-detail.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { NgPrimeModule } from '../../_forms/prime.module';
import { ProfileModule } from '../../_shared/profile/profile.module';
import { CommunicationComponent } from './communication/communication.component';
import { OrgBasicComponent } from './org-basic/org-basic.component';
@NgModule({
  declarations: [OrganizationComponent, OrganizationBankDetailComponent, OrganizationProfileComponent, CommunicationComponent, OrgBasicComponent],
  imports: [
    CommonModule, AccountOrganizationRoutingModule, ProfileModule, NgPrimeModule
  ],
  exports: [
    OrganizationBankDetailComponent
  ]
})
export class OrganizationModule { }
