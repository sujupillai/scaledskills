import '../polyfills';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_shared/header/header.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { HeaderTopComponent } from './_shared/header/header-top/header-top.component';
import { HeaderMiddleComponent } from './_shared/header/header-middle/header-middle.component';
import { HeaderFullComponent } from './_shared/header/header-full/header-full.component';
import { ErrorComponent } from './_shared/error/error.component';
import { HeaderSearchComponent } from './_shared/header/header-search/header-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderTopComponent,
    HeaderFullComponent,
    HeaderMiddleComponent,
    ErrorComponent,
    HeaderSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
