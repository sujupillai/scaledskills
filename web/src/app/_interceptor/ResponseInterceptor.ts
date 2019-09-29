import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SharedService } from '../_service/shared.service';
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(public snackBar: MatSnackBar, public _SharedService: SharedService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
        }
      }, error => {
        //console.error('NICE ERROR', error)
        if (error.status == 500) {
          debugger
          // if (error.error && error.error.ErrorMessage == 'Auth Failed Status Code 401') {
          //   setTimeout(function () {
          //     this._SharedService.hide()
          //     const snackBarRef = this.snackBar.open('Access Denied', 'close', {
          //       duration: 5000,
          //       verticalPosition: 'top',
          //       horizontalPosition: 'center'
          //     });
          //     snackBarRef.afterDismissed().subscribe(info => {
          //       if (info.dismissedByAction === true) {
          //         localStorage.clear();
          //         sessionStorage.clear();
          //         location.reload();
          //       }
          //     });
          //   }.bind(this), 3 * 1000);
          // }
        } else if (error.error.Message == 'Authorization has been denied for this request.') {
          setTimeout(function () {
            this._SharedService.hide()
            // const snackBarRef = this.snackBar.open('Access Denied', 'close', {
            //   duration: 10000,
            //   verticalPosition: 'top',
            //   horizontalPosition: 'center'
            // });
            // snackBarRef.afterDismissed().subscribe(info => {
            //   if (info.dismissedByAction === true) {
            //     localStorage.clear();
            //     sessionStorage.clear();
            //     location.reload();
            //   }
            // });
          }.bind(this), 3 * 1000);
        }
      })
    )
  }
}