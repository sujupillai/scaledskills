import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrainerComponent } from './trainer.component'
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { AboutComponent } from '../../_shared/profile/about/about.component';
import { SocialComponent } from '../../_shared/profile/social/social.component';
import { CertificationsComponent } from '../../_shared/profile/certifications/certifications.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { AddTrainingBasicComponent } from './add-training-basic/add-training-basic.component';
import { AddTrainingLocationComponent } from './add-training-location/add-training-location.component';
import { AddTrainingTagsComponent } from './add-training-tags/add-training-tags.component';
import { AddTrainingImagesComponent } from './add-training-images/add-training-images.component';
import { AddTrainingTicketComponent } from './add-training-ticket/add-training-ticket.component';
import { AddTrainingQuestionComponent } from './add-training-question/add-training-question.component';
import { AddTrainingFeedbackComponent } from './add-training-feedback/add-training-feedback.component';
import { AddTrainingPromotionsComponent } from './add-training-promotions/add-training-promotions.component';
import { AddTrainingSettingsComponent } from './add-training-settings/add-training-settings.component'
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { TrainerBasicComponent } from './trainer-basic/trainer-basic.component'
import { AuthGuard } from '../../_guards';
import { TrainingFinalComponent } from './training-final/training-final.component';
const routes = [
  {
    path: '', component: TrainerComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile', component: TrainerProfileComponent,
        children: [
          { path: '', redirectTo: 'basic', pathMatch: 'full' },
          { path: 'basic', component: TrainerBasicComponent },
          { path: 'about', component: AboutComponent },
          { path: 'certificate', component: CertificationsComponent },
          { path: 'social', component: SocialComponent },
        ],
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'training/:id', component: AddTrainingComponent,
    children: [
      { path: '', redirectTo: 'basic', pathMatch: 'full' },
      { path: 'basic', component: AddTrainingBasicComponent },
      { path: 'location', component: AddTrainingLocationComponent },
      { path: 'tags', component: AddTrainingTagsComponent },
      { path: 'tags', component: AddTrainingTagsComponent },
      { path: 'images', component: AddTrainingImagesComponent },
      { path: 'ticket', component: AddTrainingTicketComponent },
      { path: 'questions', component: AddTrainingQuestionComponent },
      { path: 'feedback', component: AddTrainingFeedbackComponent },
      { path: 'promotions', component: AddTrainingPromotionsComponent },
      // { path: 'settings', component: AddTrainingSettingsComponent },
      { path: 'addTrainer', component: AddTrainerComponent },
      { path: 'publish', component: TrainingFinalComponent },
    ],
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTrainerRoutingModule { }
