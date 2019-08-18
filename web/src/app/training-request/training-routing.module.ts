import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RequestComponent} from './request.component';

const routes = [
  {
    path: '', component: RequestComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRequestRoutingModule { }
