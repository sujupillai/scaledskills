import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RequestComponent} from './request.component';
import { AuthGuard } from '../_guards';
const routes = [
  {
    path: '', component: RequestComponent, canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRequestRoutingModule { }
