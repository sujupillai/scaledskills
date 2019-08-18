import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generalComponent } from './general.component';
import { GeneralRoutingModule } from './general-routing.module';
import { GenCommunicationComponent } from './communication/communication.component';
import {FormModule} from '../../_forms/form/form.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [generalComponent, GenCommunicationComponent],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    FormModule,
    AngularEditorModule
  ]
})
export class GeneralModule { }
