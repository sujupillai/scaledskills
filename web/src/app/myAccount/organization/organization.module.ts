import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { FormModule } from '../../_forms/form/form.module';
import { ProfileComponent } from './profile/profile.component';
import { MembersComponent } from './members/members.component';
import { OrgBankDetailsComponent } from './bank-details/bank-details.component';
import { OrgBasicComponent } from './profile/basic/basic.component';
import { OrgAboutComponent } from './profile/about/about.component';
import { OrgSocialComponent } from './profile/social/social.component'
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [OrganizationComponent, ProfileComponent, MembersComponent, OrgBankDetailsComponent, OrgBasicComponent, OrgAboutComponent, OrgSocialComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    FormModule,
    AngularEditorModule
  ]
})
export class OrganizationModule { }
