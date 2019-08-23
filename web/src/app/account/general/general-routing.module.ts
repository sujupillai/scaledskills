import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralComponent } from './general.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { BasicComponent } from '../../_shared/profile/basic/basic.component';
import { AboutComponent } from '../../_shared/profile/about/about.component';
import { SocialComponent } from '../../_shared/profile/social/social.component';
import { FeatureTrainingComponent } from './feature-training/feature-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CancelTrainingParticipationComponent } from './cancel-training-participation/cancel-training-participation.component';
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
          { path: 'about', component: AboutComponent },
          { path: 'social', component: SocialComponent },
        ]
      },
      { path: 'featureTraining', component: FeatureTrainingComponent },
      { path: 'pastTraining', component: PastTrainingComponent },
      { path: 'cancelParticipation', component: CancelTrainingParticipationComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountGeneralRoutingModule { }
