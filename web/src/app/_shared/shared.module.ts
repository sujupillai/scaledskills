import { NgModule } from '@angular/core';
import { NgPrimeModule } from '../_forms/prime.module';
import { LoaderComponent } from './loader/loader.component';
import {DigitOnlyDirective} from '../_shared/digit-only.directive';
import { TrainingCardComponent } from './training-card/training-card.component';
import {ExternalUrlDirective} from './ExternalUrlDirective ';
import {MessageComponent} from './_dialogs/message/message.component';
import { ReviewComponent } from './_dialogs/review/review.component';
import { MembersTempComponent } from './members-temp/members-temp.component';
import { ReviewTempComponent } from './review-temp/review-temp.component';


@NgModule({
  declarations: [LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent, ReviewComponent, MembersTempComponent, ReviewTempComponent],
  exports: [
    LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent, ReviewComponent, MembersTempComponent,
    ReviewTempComponent
  ],
  imports: [
    NgPrimeModule,
  ],
  entryComponents: [MessageComponent, ReviewComponent],
  providers: []
})
export class SharedModule { }
