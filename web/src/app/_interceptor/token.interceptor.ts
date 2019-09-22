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
    const url = req.url.split('/');
    let params = req.params.toString();
    if (params.indexOf('isAuth=false') >= 0) {
      isTokenRquired = false
    } else {
      isTokenRquired = true
    }
    if (params.indexOf('isLoader=false') >= 0) {
      this._SharedService.hide();
    } else {
      this._SharedService.show();
    }
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
