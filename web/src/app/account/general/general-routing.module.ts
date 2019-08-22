import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralComponent } from './general.component';
const routes = [
  { path: '', component: GeneralComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountGeneralRoutingModule { }
