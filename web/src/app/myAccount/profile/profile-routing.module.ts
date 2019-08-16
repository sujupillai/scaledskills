import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { BasicComponent } from './basic/basic.component';
import { KeywordsComponent } from './keywords/keywords.component';
import { CredentialsComponent } from './credentials/credentials.component'
import { AboutComponent } from './about/about.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { SocialComponent } from './social/social.component';
const routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'basic', pathMatch: 'full' },
      { path: 'basic', component: BasicComponent },
      { path: 'password', component: CredentialsComponent },
      { path: 'keyword', component: KeywordsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'certificate', component: CertificationsComponent },
      { path: 'social', component: SocialComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
