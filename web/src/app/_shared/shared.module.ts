import { NgModule } from '@angular/core';
import { NgPrimeModule } from '../_forms/prime.module';
import { LoaderComponent } from './loader/loader.component';
import {DigitOnlyDirective} from '../_shared/digit-only.directive';
import { TrainingCardComponent } from './training-card/training-card.component';
import {ExternalUrlDirective} from './ExternalUrlDirective ';
import {MessageComponent} from './_dialogs/message/message.component';


@NgModule({
  declarations: [LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent],
  exports: [
    LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent
  ],
  imports: [
    NgPrimeModule,
  ],
  entryComponents: [MessageComponent],
  providers: []
})
export class SharedModule { }
