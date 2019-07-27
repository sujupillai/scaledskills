import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainersRoutingModule } from './trainers-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../../_material/material.module';
import { PersonalComponent } from './profile/personal/personal.component';
import { CredentialsComponent } from './profile/credentials/credentials.component';
import { KeywordsComponent } from './profile/keywords/keywords.component';
import { AboutComponent } from './profile/about/about.component';
import { CertificationsEarnedComponent } from './profile/certifications-earned/certifications-earned.component';
import { SocialMediaComponent } from './profile/social-media/social-media.component';

@NgModule({
  declarations: [ProfileComponent, PersonalComponent, CredentialsComponent, KeywordsComponent, AboutComponent, CertificationsEarnedComponent, SocialMediaComponent],
  imports: [
    CommonModule,
    TrainersRoutingModule,
    MaterialModule
  ]
})
export class TrainersModule { }
