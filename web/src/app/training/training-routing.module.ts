import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrainingMainComponent } from './training-main/training-main.component';
const routes = [
  { path: 'dashboard', component: TrainingMainComponent },
  { path: '', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
