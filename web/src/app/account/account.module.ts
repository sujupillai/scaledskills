import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountDashboardComponent } from './account-dashboard.component';
import { MaterialCardModule } from '../_material/material.card.module';


@NgModule({
  declarations: [AccountDashboardComponent],
  imports: [
    CommonModule, AccountRoutingModule, MaterialCardModule
  ]
})
export class AccountModule { }
