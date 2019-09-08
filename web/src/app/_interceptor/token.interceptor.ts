import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { SharedService } from '../_service/shared.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../_service/authentication.service';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(public _SharedService: SharedService, private _AuthenticationService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._SharedService.show();
    const accessToken = this.getToken();
    const url = req.url.split('/')
    if (url[2] !== 'login.microsoftonline.com') {
      let dummyrequest = req.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
      return next.handle(dummyrequest).pipe(finalize(() => this._SharedService.hide()));
    } else {
      return next.handle(req.clone({ setHeaders: {} })).pipe(finalize(() => this._SharedService.hide()));
    }
  }
  getToken() {
    return this._AuthenticationService.currentUserValue;
  }
}
