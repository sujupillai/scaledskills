import { NgModule } from '@angular/core';
import { NgPrimeModule } from '../_forms/prime.module';
import { LoaderComponent } from './loader/loader.component';
import {DigitOnlyDirective} from '../_shared/digit-only.directive';
import { TrainingCardComponent } from './training-card/training-card.component';
import {ExternalUrlDirective} from './ExternalUrlDirective ';
import {MessageComponent} from './_dialogs/message/message.component';
import { MembersTempComponent } from './members-temp/members-temp.component';



@NgModule({
  declarations: [LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent, MembersTempComponent],
  exports: [
    LoaderComponent, DigitOnlyDirective, TrainingCardComponent, ExternalUrlDirective, MessageComponent, MembersTempComponent,
  ],
  imports: [
    NgPrimeModule,
  ],
  entryComponents: [MessageComponent],
  providers: []
})
export class SharedModule { }
