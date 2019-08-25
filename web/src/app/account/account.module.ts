import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountDashboardComponent } from './account-dashboard.component';
import { NgPrimeModule } from '../_forms/prime.module';
@NgModule({
  declarations: [AccountDashboardComponent],
  imports: [
    CommonModule, AccountRoutingModule, NgPrimeModule
  ]
})
export class AccountModule { }
