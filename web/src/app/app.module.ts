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
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    ReportComponent,
    TrainingUrlComponent,
    TrainerUrlComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgPrimeModule,
    SharedModule
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [DialogService, SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: interceptor.HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
