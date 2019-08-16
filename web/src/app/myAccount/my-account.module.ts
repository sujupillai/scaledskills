import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MaterialModule} from '../_material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    MaterialModule,
    CKEditorModule
  ]
})
export class MyAccountModule { }
