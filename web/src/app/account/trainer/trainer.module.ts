import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerComponent } from './trainer.component'
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { AccountTrainerRoutingModule } from './trainer-routing.module';
import { ProfileModule } from '../../_shared/profile/profile.module';
import { AddTrainingComponent } from './add-training/add-training.component';
import { AddTrainingBasicComponent } from './add-training-basic/add-training-basic.component';
import { AddTrainingLocationComponent } from './add-training-location/add-training-location.component';
import { AddTrainingTagsComponent } from './add-training-tags/add-training-tags.component';
import { AddTrainingImagesComponent } from './add-training-images/add-training-images.component';
import { AddTrainingTicketComponent } from './add-training-ticket/add-training-ticket.component';
import { AddTrainingQuestionComponent } from './add-training-question/add-training-question.component';
import { AddTrainingFeedbackComponent } from './add-training-feedback/add-training-feedback.component';
import { AddTrainingPromotionsComponent } from './add-training-promotions/add-training-promotions.component';
import { AddTrainingSettingsComponent } from './add-training-settings/add-training-settings.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { NgPrimeModule } from '../../_forms/prime.module';
import { SharedModule } from '../../_shared/shared.module';
import { TrainerBasicComponent } from './trainer-basic/trainer-basic.component'
@NgModule({
  declarations: [TrainerComponent, TrainerProfileComponent, AddTrainingComponent, AddTrainingBasicComponent, AddTrainingLocationComponent, AddTrainingTagsComponent, AddTrainingImagesComponent, AddTrainingTicketComponent, AddTrainingQuestionComponent, AddTrainingFeedbackComponent, AddTrainingPromotionsComponent, AddTrainingSettingsComponent, AddTrainerComponent, TrainerBasicComponent],
  imports: [
    CommonModule, AccountTrainerRoutingModule, ProfileModule, NgPrimeModule, SharedModule
  ]
})
export class TrainerModule { }
