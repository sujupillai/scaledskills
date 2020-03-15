import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../_service/shared.service';
import { finalize } from 'rxjs/operators';
import { Router, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private _SharedService: SharedService, private _Router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._SharedService.show();
    // if (req.params.toLocaleString().indexOf('auth=false') >= -0) {
    //   isTokenRquired = false
    // } else {
    //   isTokenRquired = true
    // }
    // if (isTokenRquired) {

    // }
    const accessToken = this._SharedService.currentUserValue ? this._SharedService.currentUserValue.auth_token : null;
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    return next.handle(req).pipe(finalize(() => this._SharedService.hide()));
  }
}
