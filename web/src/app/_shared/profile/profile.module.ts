import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile.component';
import { AboutComponent } from './about/about.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { SocialComponent } from './social/social.component';
import {NgPrimeModule} from '../../_forms/prime.module';
@NgModule({
  declarations: [ProfileComponent, AboutComponent, CertificationsComponent, SocialComponent],
  imports: [
    CommonModule, ProfileRoutingModule, NgPrimeModule
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
