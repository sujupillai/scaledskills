import '../polyfills';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as interceptor from './_interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_shared/header/header.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { ErrorComponent } from './_shared/error/error.component';
import { ReportComponent } from './report/report.component';
import { NgPrimeModule } from './_forms/prime.module';
import { SharedModule } from './_shared/shared.module'
import { SharedService } from './_service/shared.service';
import { TrainingUrlComponent } from './view/training-url/training-url.component';
import { TrainerUrlComponent } from './view/trainer-url/trainer-url.component';
import { DialogService } from 'primeng/api';
import { ConfirmationDialogComponent } from './_shared/confirmation-dialog/confirmation-dialog.component';
import { RequestListComponent } from './training-request/request-list/request-list.component';
import { RequestComponent } from './training-request/request.component';
import { MyRequestComponent } from './training-request/my-request/my-request.component';
import { MyResponseComponent } from './training-request/my-response/my-response.component';
import { OrganizerUrlComponent } from './view/organizer-url/organizer-url.component';
import {TrainingFormComponent} from './training-request/training-form/training-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    ReportComponent,
    TrainingUrlComponent,
    TrainerUrlComponent,
    ConfirmationDialogComponent,
    RequestComponent,
    RequestListComponent,
    MyRequestComponent,
    MyResponseComponent,
    OrganizerUrlComponent,
    TrainingFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgPrimeModule,
    SharedModule
  ],
  
  providers: [DialogService, SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: interceptor.HeaderInterceptor,
      multi: true
    },
  ],
  exports: [],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
