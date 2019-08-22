import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountDashboardComponent } from './account-dashboard.component';

const routes = [
  { path: '', component: AccountDashboardComponent },
  { path: 'general', loadChildren: () => import('./general/general.module').then(mod => mod.AccountGeneralModule)}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
