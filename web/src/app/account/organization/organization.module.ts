import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { OrganizationBankDetailComponent } from './organization-bank-detail/organization-bank-detail.component';

@NgModule({
  declarations: [OrganizationProfileComponent, OrganizationBankDetailComponent],
  imports: [
    CommonModule
  ]
})
export class OrganizationModule { }
