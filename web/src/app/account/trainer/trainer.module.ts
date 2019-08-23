import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerComponent } from './trainer.component'
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { AccountTrainerRoutingModule } from './trainer-routing.module';
import { ProfileModule } from '../../_shared/profile/profile.module';
import { FormModule } from '../../_forms/form/form.module';
import { AddTrainingComponent } from './add-training/add-training.component';
import { AddTrainingBasicComponent } from './add-training-basic/add-training-basic.component';
import { AddTrainingLocationComponent } from './add-training-location/add-training-location.component';


@NgModule({
  declarations: [TrainerComponent, TrainerProfileComponent, AddTrainingComponent, AddTrainingBasicComponent, AddTrainingLocationComponent],
  imports: [
    CommonModule, AccountTrainerRoutingModule, ProfileModule, FormModule
  ]
})
export class TrainerModule { }
