import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRequestRoutingModule } from './training-routing.module';
import { RequestComponent } from './request.component';
import { FormModule } from '../_forms/form/form.module';

@NgModule({
  declarations: [RequestComponent],
  imports: [
    CommonModule,
    TrainingRequestRoutingModule,
    FormModule
  ]
})
export class TrainingRequestModule { }
