import { NgModule } from '@angular/core';
import { NgPrimeModule } from '../_forms/prime.module';
import { LoaderComponent } from './loader/loader.component';
import {DigitOnlyDirective} from '../_shared/digit-only.directive'

@NgModule({
  declarations: [LoaderComponent, DigitOnlyDirective],
  exports: [
    LoaderComponent, DigitOnlyDirective
  ],
  imports: [
    NgPrimeModule,
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule { }
