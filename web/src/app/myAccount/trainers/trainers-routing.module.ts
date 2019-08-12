import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PersonalComponent } from './profile/personal/personal.component';
import { CredentialsComponent } from './profile/credentials/credentials.component';
import { KeywordsComponent } from './profile/keywords/keywords.component';
import { AboutComponent } from './profile/about/about.component';
import { CertificationsEarnedComponent } from './profile/certifications-earned/certifications-earned.component';
import { SocialMediaComponent } from './profile/social-media/social-media.component';
const routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'basic', pathMatch: 'full' },
      { path: 'basic', component: PersonalComponent },
      { path: 'password', component: CredentialsComponent },
      { path: 'keyword', component: KeywordsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'certificate', component: CertificationsEarnedComponent },
      { path: 'social', component: SocialMediaComponent },
    ]
  },
  { path: '', redirectTo: 'profile' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainersRoutingModule { }
