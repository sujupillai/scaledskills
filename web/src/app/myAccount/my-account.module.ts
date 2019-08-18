import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialCardModule } from '../_material/material.card.module';
import { AccountComponent } from './my-account.component';

@NgModule({
  declarations: [DashboardComponent, AccountComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    MaterialCardModule,
  ]
})
export class MyAccountModule { }
