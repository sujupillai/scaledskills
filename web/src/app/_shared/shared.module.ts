import { NgModule } from '@angular/core';
import { NgPrimeModule } from '../_forms/prime.module';
import { LoaderComponent } from './loader/loader.component';
import {DigitOnlyDirective} from '../_shared/digit-only.directive';
import { TrainingCardComponent } from './training-card/training-card.component';
import {ExternalUrlDirective} from './ExternalUrlDirective ';
import {MessageComponent} from './_dialogs/message/message.component';
import { ReviewComponent } from './_dialogs/review/review.component';


@NgModule({
  declarations: [LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent, ReviewComponent],
  exports: [
    LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent, ReviewComponent
  ],
  imports: [
    NgPrimeModule,
  ],
  entryComponents: [MessageComponent, ReviewComponent],
  providers: []
})
export class SharedModule { }
