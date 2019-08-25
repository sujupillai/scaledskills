import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRequestRoutingModule } from './training-routing.module';
import { RequestComponent } from './request.component';
import { NgPrimeModule } from '../_forms/prime.module';

@NgModule({
  declarations: [RequestComponent],
  imports: [
    CommonModule,
    TrainingRequestRoutingModule,
    NgPrimeModule
  ]
})
export class TrainingRequestModule { }
