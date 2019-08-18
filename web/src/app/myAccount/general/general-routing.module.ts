import { NgModule } from '@angular/core';
import { GenCommunicationComponent } from './communication/communication.component';
import { RouterModule } from '@angular/router';
const routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then(mod => mod.ProfileModule),
  },
  {
    path: 'communication', component: GenCommunicationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
