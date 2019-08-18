import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes = [
  {
    path: '',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard/general',
    loadChildren: () => import('./general/general.module').then(mod => mod.GeneralModule),
  },
  {
    path: 'dashboard/organization',
    loadChildren: () => import('./organization/organization.module').then(mod => mod.OrganizationModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
