import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile.component';
import { BasicComponent } from './basic/basic.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { KeywordsComponent } from './keywords/keywords.component';
import { AboutComponent } from './about/about.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { SocialComponent } from './social/social.component';
import { OrgBasicComponent } from './org-basic/org-basic.component';
import {NgPrimeModule} from '../../_forms/prime.module';
@NgModule({
  declarations: [ProfileComponent, BasicComponent, CredentialsComponent, KeywordsComponent, AboutComponent, CertificationsComponent, SocialComponent, OrgBasicComponent],
  imports: [
    CommonModule, ProfileRoutingModule, NgPrimeModule
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
