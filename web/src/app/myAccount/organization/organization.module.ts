import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import {FormModule } from '../../_forms/form/form.module';
import { ProfileComponent } from './profile/profile.component';
import { MembersComponent } from './members/members.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { CommunicationComponent } from './communication/communication.component'

@NgModule({
  declarations: [OrganizationComponent, ProfileComponent, MembersComponent, BankDetailsComponent, CommunicationComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    FormModule
  ]
})
export class OrganizationModule { }
