import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [DashboardComponent, ProfileComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
