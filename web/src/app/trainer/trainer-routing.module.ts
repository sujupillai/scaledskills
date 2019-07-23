import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrainerAccountComponent } from './trainer-account/trainer-account.component';
const trainerRoutes = [
  { path: 'trainer', component: TrainerAccountComponent },
  { path: '', component: TrainerAccountComponent },
];
@NgModule({
  imports: [RouterModule.forChild(trainerRoutes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }