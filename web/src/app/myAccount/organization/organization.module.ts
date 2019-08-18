import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import {FormModule } from '../../_forms/form/form.module';
import { ProfileComponent } from './profile/profile.component';
import { MembersComponent } from './members/members.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BasicComponent } from './profile/basic/basic.component';
import { AboutComponent } from './profile/about/about.component';
import { SocialComponent } from './profile/social/social.component'

@NgModule({
  declarations: [OrganizationComponent, ProfileComponent, MembersComponent, BankDetailsComponent, BasicComponent, AboutComponent, SocialComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    FormModule,
  ]
})
export class OrganizationModule { }
