import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../_service/authentication.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public _AuthenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
    return next.handle(req);
  }
}
