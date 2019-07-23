import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const accountRoutes = [];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
