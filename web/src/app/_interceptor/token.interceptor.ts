import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../_service/authentication.service';
import { Observable } from 'rxjs';
import { SharedService } from '../_service/shared.service';
import { finalize } from 'rxjs/operators';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(public _AuthenticationService: AuthenticationService, private _SharedService: SharedService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isTokenRquired = false;
    const accessToken = this._AuthenticationService.currentUserValue.auth_token
    console.log('accessToken', JSON.stringify(accessToken))
    const url = req.url.split('/')
    if (url[url.length - 1] == 'Account' || url[url.length - 1] == 'login') {
      isTokenRquired = false
    } else {
      isTokenRquired = true
    }
    if (isTokenRquired) {
      req = req.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(req).pipe(finalize(() => this._SharedService.hide()));
  }
}
