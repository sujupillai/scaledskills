import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  { path: 'trainers', loadChildren: () => import('./trainers/trainers.module').then(mod => mod.TrainersModule), },
  { path: '', redirectTo: 'trainers', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
