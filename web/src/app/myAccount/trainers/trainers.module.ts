import { NgModule } from '@angular/core';
import { TrainersRoutingModule } from './trainers-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PersonalComponent } from './profile/personal/personal.component';
import { CredentialsComponent } from './profile/credentials/credentials.component';
import { KeywordsComponent } from './profile/keywords/keywords.component';
import { AboutComponent } from './profile/about/about.component';
import { CertificationsEarnedComponent } from './profile/certifications-earned/certifications-earned.component';
import { SocialMediaComponent } from './profile/social-media/social-media.component';
import {FormModule} from '../../_forms/form/form.module'

@NgModule({
  declarations: [ProfileComponent, PersonalComponent, CredentialsComponent, KeywordsComponent, AboutComponent, CertificationsEarnedComponent, SocialMediaComponent],
  imports: [
    TrainersRoutingModule,
    FormModule
  ]
})
export class TrainersModule { }
