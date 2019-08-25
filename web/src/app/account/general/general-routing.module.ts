import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralComponent } from './general.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { BasicComponent } from '../../_shared/profile/basic/basic.component';
import { FeatureTrainingComponent } from './feature-training/feature-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CancelTrainingParticipationComponent } from './cancel-training-participation/cancel-training-participation.component';
import { OrganizationBankDetailComponent } from '../organization/organization-bank-detail/organization-bank-detail.component';
import { CredentialsComponent } from '../../_shared/profile/credentials/credentials.component';
const routes = [
  {
    path: '', component: GeneralComponent,
    children: [
      { path: '', redirectTo: 'profile' },
      {
        path: 'profile', component: GeneralProfileComponent,
        children: [
          { path: '', redirectTo: 'basic', pathMatch: 'full' },
          { path: 'basic', component: BasicComponent },
          { path: 'password', component: CredentialsComponent }
        ]
      },
      { path: 'featureTraining', component: FeatureTrainingComponent },
      { path: 'pastTraining', component: PastTrainingComponent },
      { path: 'cancelParticipation', component: CancelTrainingParticipationComponent },
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
export class AccountGeneralRoutingModule { }
