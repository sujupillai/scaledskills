import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../auth/_models';
import { Router } from '@angular/router';
import { HttpService } from './http.service'
import { DialogService } from 'primeng/api';
import { ConfirmationDialogComponent } from '../_shared/confirmation-dialog/confirmation-dialog.component'
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class SharedService {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(public dialogService: DialogService, private _Router: Router, private _HttpService: HttpService) {
    let tempUserInfo: any;
    if (localStorage.isRememberMe != 'true') {
      tempUserInfo = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')))
    } else {
      tempUserInfo = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    }
    this.currentUserSubject = tempUserInfo;
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(url: string, data: any) {
    localStorage.clear();
    sessionStorage.clear();
    return this._HttpService.httpCall(url, 'POST', data, null).pipe(map(res => {
      if (res && res.responseCode == 200) {
        let user;
        user = {
          ...res.result,
          isRememberMe: data.isRememberMe
        }
        localStorage.setItem('isRememberMe', data.isRememberMe);
        if (localStorage.isRememberMe != 'true') {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        this.fireIsLoggedIn.emit()
      }
      return res;
    }));
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.currentUserSubject.next(null);
    this._Router.navigate(['/auth/login']);
  }
  getAuthEmitter() {
    return this.fireIsLoggedIn;
  }
  activeLoader = new Subject<boolean>();
  show() {
    this.activeLoader.next(true);
  }
  hide() {
    this.activeLoader.next(false);
  }
  openDialog = (dialogConfig, dialogHeader) => {
    return this.dialogService.open(ConfirmationDialogComponent, {
      data: {
        ...dialogConfig
      },
      header: dialogHeader,
      width: '50%'
    });
  }
  dialogConfig = (mesage, isAction, isYes, isNo, yesText, noText, autoClose, header) => {
    let dialogConfig = {
      message: mesage,
      isAction: isAction,
      isYes: isYes,
      isNo: isNo,
      yesText: yesText,
      noText: noText,
      autoClose: autoClose
    };
    let dialogHeader = header;
    let ref = this.openDialog(dialogConfig, dialogHeader);
    return ref.onClose;
  }
}
