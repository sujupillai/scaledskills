import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { AccountOrganizationRoutingModule } from './organization-routing.module'
@NgModule({
  declarations: [OrganizationComponent],
  imports: [
    CommonModule, AccountOrganizationRoutingModule
  ]
})
export class OrganizationModule { }
