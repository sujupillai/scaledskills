import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRequestRoutingModule } from './training-routing.module';
import { RequestComponent } from './request.component';
import { FormModule } from '../_forms/form/form.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [RequestComponent],
  imports: [
    CommonModule,
    TrainingRequestRoutingModule,
    FormModule,
    AngularEditorModule
  ]
})
export class TrainingRequestModule { }
