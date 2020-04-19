import { NgModule } from '@angular/core';
import { NgPrimeModule } from '../_forms/prime.module';
import { LoaderComponent } from './loader/loader.component';
import {DigitOnlyDirective} from '../_shared/digit-only.directive';
import { TrainingCardComponent } from './training-card/training-card.component';
import {ExternalUrlDirective} from './ExternalUrlDirective ';
import {MessageComponent} from './_dialogs/message/message.component';
import { MembersTempComponent } from './members-temp/members-temp.component';
import { ReviewTempComponent } from './review-temp/review-temp.component';


@NgModule({
  declarations: [LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent, MembersTempComponent, ReviewTempComponent],
  exports: [
    LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent, MembersTempComponent,
    ReviewTempComponent
  ],
  imports: [
    NgPrimeModule,
  ],
  entryComponents: [MessageComponent],
  providers: []
})
export class SharedModule { }
