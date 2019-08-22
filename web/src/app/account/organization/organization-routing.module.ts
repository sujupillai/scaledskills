import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization.component'
import { OrganizationBankDetailComponent } from './organization-bank-detail/organization-bank-detail.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { OrgBasicComponent } from '../../_shared/profile/org-basic/org-basic.component';
import { OrgAboutComponent } from '../../_shared/profile/org-about/org-about.component';
import { SocialComponent } from '../../_shared/profile/social/social.component';

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
          { path: 'about', component: OrgAboutComponent },
          { path: 'social', component: SocialComponent },
        ]
      },
      {
        path: 'bank', component: OrganizationBankDetailComponent,
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOrganizationRoutingModule { }
