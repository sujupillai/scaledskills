import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { ProfileComponent } from './profile/profile.component';
import { MembersComponent } from './members/members.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { CommunicationComponent } from './communication/communication.component';

const routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'member', component: MembersComponent },
      { path: 'bank', component: BankDetailsComponent },
      // { path: 'communication', component: CommunicationComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
