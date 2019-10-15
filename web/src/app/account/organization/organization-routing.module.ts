import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization.component'
import { OrganizationBankDetailComponent } from './organization-bank-detail/organization-bank-detail.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { OrgBasicComponent } from './org-basic/org-basic.component';
import { AboutComponent } from '../../_shared/profile/about/about.component';

import { SocialComponent } from '../../_shared/profile/social/social.component';
import { CommunicationComponent } from './communication/communication.component';

const routes = [
  {
    path: '', component: OrganizationComponent,
    children: [
      { path: '', redirectTo: 'profile' },
      {
        path: 'profile', component: OrganizationProfileComponent,
        children: [
          { path: '', redirectTo: 'basic', pathMatch: 'full' },
          { path: 'basic', component: OrgBasicComponent },
          { path: 'about', component: AboutComponent },
          { path: 'social', component: SocialComponent },
        ]
      },
      {
        path: 'bank', component: OrganizationBankDetailComponent,
      },
      {
        path: 'communication', component:CommunicationComponent ,
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOrganizationRoutingModule { }
