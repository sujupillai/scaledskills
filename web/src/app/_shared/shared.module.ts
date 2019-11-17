import { NgModule } from '@angular/core';
import { NgPrimeModule } from '../_forms/prime.module';
import { LoaderComponent } from './loader/loader.component';
import {DigitOnlyDirective} from '../_shared/digit-only.directive';
import { TrainingCardComponent } from './training-card/training-card.component'

@NgModule({
  declarations: [LoaderComponent, DigitOnlyDirective, TrainingCardComponent],
  exports: [
    LoaderComponent, DigitOnlyDirective, TrainingCardComponent
  ],
  imports: [
    NgPrimeModule,
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule { }
