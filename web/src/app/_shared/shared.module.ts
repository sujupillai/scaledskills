import { NgModule } from '@angular/core';
import { NgPrimeModule } from '../_forms/prime.module';
import { LoaderComponent } from './loader/loader.component'

@NgModule({
  declarations: [LoaderComponent],
  exports: [
    LoaderComponent
  ],
  imports: [
    NgPrimeModule,
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule { }
