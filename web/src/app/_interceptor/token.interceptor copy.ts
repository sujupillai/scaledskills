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
export class TokenInterceptor implements HttpInterceptor {
  constructor(public _AuthenticationService: AuthenticationService, private _SharedService: SharedService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._SharedService.show();
    let isTokenRquired = true;
    const url = req.url.split('/')
    url.filter((x) => {
      if (x == 'register' || x == 'login') {
        isTokenRquired = false
      } else {
        isTokenRquired = true
      }
    })
    if (isTokenRquired) {
      const accessToken = this._AuthenticationService.currentUserValue;
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken.auth_token}`
        }
      });
    }
    return next.handle(req).pipe(finalize(() => this._SharedService.hide()));
  }
}
