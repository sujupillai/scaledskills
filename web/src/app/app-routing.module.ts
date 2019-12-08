import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './_shared/error/error.component';
import { ReportComponent } from './report/report.component';
import { TrainingUrlComponent } from './view/training-url/training-url.component';
import { TrainerUrlComponent } from './view/trainer-url/trainer-url.component';
import { RequestListComponent } from './training-request/request-list/request-list.component';
import { RequestComponent } from './training-request/request.component';
import { OrganizerUrlComponent } from './view/organizer-url/organizer-url.component';
import { AuthGuard } from './_guards';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'trainingRequest/:id', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'trainingRequests', component: RequestListComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
  },
  { path: 'report', component: ReportComponent },
  { path: 'view/t/:url', component: TrainingUrlComponent },
  { path: 'view/p/:url', component: TrainerUrlComponent },
  { path: 'view/o/:url', component: OrganizerUrlComponent },
  { path: '**', component: ErrorComponent, pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
