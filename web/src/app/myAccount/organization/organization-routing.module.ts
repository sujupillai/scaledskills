import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { MembersComponent } from './members/members.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { ProfileComponent } from './profile/profile.component';
import { BasicComponent } from './profile/basic/basic.component';
const routes = [
  {
    path: '', component: OrganizationComponent,
    children: [
      {
        path: 'profile', component: ProfileComponent,
        children: [
          {
            path: 'basic', component: BasicComponent,
          }
        ]
      },
      {
        path: 'member', component: MembersComponent,
      },
      {
        path: 'bank', component: BankDetailsComponent,
      }
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
