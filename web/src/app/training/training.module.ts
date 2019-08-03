import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../_material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingBasicsComponent } from './training-basics/training-basics.component';
import { TrainingLocationComponent } from './training-location/training-location.component';
import { TrainingTagsComponent } from './training-tags/training-tags.component';
import { TrainingImageComponent } from './training-image/training-image.component';
import { TrainingTicketsComponent } from './training-tickets/training-tickets.component';
import { TrainingQuestionsComponent } from './training-questions/training-questions.component';
import { TrainingReviewComponent } from './training-review/training-review.component';
import { TrainingPromotiionnsComponent } from './training-promotiionns/training-promotiionns.component';
import { TrainingPromotionsComponent } from './training-promotions/training-promotions.component';
import { TrainingSettingsComponent } from './training-settings/training-settings.component';
import { TrainingFinalComponent } from './training-final/training-final.component';
import { TrainingMainComponent } from './training-main/training-main.component';

@NgModule({
  declarations: [TrainingBasicsComponent, TrainingLocationComponent, TrainingTagsComponent, TrainingImageComponent, TrainingTicketsComponent, TrainingQuestionsComponent, TrainingReviewComponent, TrainingPromotiionnsComponent, TrainingPromotionsComponent, TrainingSettingsComponent, TrainingFinalComponent, TrainingMainComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TrainingModule { }
