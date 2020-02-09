import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './_shared/error/error.component';
import { ReportComponent } from './report/report.component';
import { TrainingUrlComponent } from './view/training-url/training-url.component';
import { TrainerUrlComponent } from './view/trainer-url/trainer-url.component';
import { RequestListComponent } from './training-request/request-list/request-list.component';
import { RequestComponent } from './training-request/request.component';
import { OrganizerUrlComponent } from './view/organizer-url/organizer-url.component';
import { OrderTicketComponent } from './view/training-url/order-ticket/order-ticket.component';
import { OrderDetailComponent } from './view/training-url/order-detail/order-detail.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { AuthGuard } from './_guards';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'trainingRequest/:id', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'trainingRequests', component: RequestListComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactUsComponent },
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
  { path: 't/:url', component: TrainingUrlComponent },
  { path: 'p/:url', component: TrainerUrlComponent },
  { path: 'o/:url', component: OrganizerUrlComponent },
  { path: 'placeOrder/:url', component: OrderTicketComponent },
  { path: 'orderDetail/:orderId', component: OrderDetailComponent },
  { path: 'maintenance', component: MaintenanceComponent},
  { path: '**', component: ErrorComponent, pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
