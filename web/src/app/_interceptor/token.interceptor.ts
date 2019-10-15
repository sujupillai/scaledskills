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
import { Router } from '@angular/router';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(public _AuthenticationService: AuthenticationService, private _SharedService: SharedService, private _Router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isTokenRquired = false;
    this._SharedService.show();
    if(req.params.toLocaleString().indexOf('auth=false')>=-0){
      isTokenRquired = false
    }else{
      isTokenRquired = true
    }
    if (isTokenRquired) {
      const accessToken = this._AuthenticationService.currentUserValue?this._AuthenticationService.currentUserValue.auth_token:null;
      if(accessToken){
        req = req.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + accessToken
          }
        });
      }else{
        localStorage.setItem('returnurl', this._Router.url);
        this._Router.navigate(['/auth/login']);
      }
    }
    return next.handle(req).pipe(finalize(() => this._SharedService.hide()));
  }
}
