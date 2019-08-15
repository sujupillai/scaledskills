import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../_material/material.module'
import { MyAccountRoutingModule } from './my-account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    MaterialModule
  ]
})
export class MyAccountModule { }
