import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralComponent } from './general.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { GeneralBasicComponent } from './general-profile/general-basic/general-basic.component'
import { OrganizationBankDetailComponent } from '../organization/organization-bank-detail/organization-bank-detail.component';
import { AttendeeViewComponent } from './attendee-view/attendee-view.component';
import { OrganizerViewComponent } from './organizer-view/organizer-view.component';
import { CredentialsComponent } from './general-profile/credentials/credentials.component';
import { AuthGuard } from '../../_guards';
const routes = [
  {
    path: '', component: GeneralComponent,
    children: [
      { path: '', redirectTo: 'profile' },
      {
        path: 'profile', component: GeneralProfileComponent,
        children: [
          { path: '', redirectTo: 'basic', pathMatch: 'full' },
          { path: 'basic', component: GeneralBasicComponent },
          { path: 'password', component: CredentialsComponent }
        ],
        canActivate: [AuthGuard]
      },
      { path: 'attendeeView', component: AttendeeViewComponent,  canActivate: [AuthGuard] },
      { path: 'organizerView', component: OrganizerViewComponent,  canActivate: [AuthGuard] },
      {path: 'bank', component: OrganizationBankDetailComponent,  canActivate: [AuthGuard]}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountGeneralRoutingModule { }
