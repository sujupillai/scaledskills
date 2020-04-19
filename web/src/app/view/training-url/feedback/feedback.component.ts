import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { DialogService } from 'primeng/api';
import { MessageComponent } from '../../../_shared/_dialogs/message/message.component';
import { ReviewComponent } from '../../../_shared/_dialogs/review/review.component';
import { HttpService, AuthenticationService, SharedService } from '../../../_service';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  refCode;
  trainingId = 0;
  urlString: string = '';
  entity = null;
  userId = 0;
  userInfo: any = {};
  isLoggedIn: boolean = false;
  constructor(public dialogService: DialogService,
    private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _HttpService: HttpService, private _AuthenticationService: AuthenticationService, private _SharedService: SharedService) {
  }
  ngOnInit() {
    let url = ApiPath.trainingUrl;
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.urlString = param.url;
      url = url.replace('{urlName}', this.urlString)
      this.getUser()
      this.getData(url)
    });
    localStorage.removeItem('returnurl');
  }
  getUser = () => {
    this.userInfo = this._AuthenticationService.currentUserValue;
    this.isLoggedIn = this.userInfo ? true : false;
  }
  getData = (url) => {
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.entity = res.result;
        this.userId = this.entity['userId'];
        this.trainingId = this.entity['trainingId']
      }
    })
  }
  goToLogin = (msg) => {
    this.refCode = null;
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.refCode = params.refCode
    });
    let returnUrl = window.location.pathname;
    localStorage.setItem('returnurl', returnUrl);
    let msgArray = [
      { mgs: msg, class: 'confirmMsg' },
      { mgs: 'Do you want to login ?', class: 'subMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Information').subscribe(res => {
      if (res) {
        if (this.refCode) {
          this._Router.navigate(['/auth/login'], { queryParams: { refCode: this.refCode } })
        } else {
          this._Router.navigate(['/auth/login']);
        }
      }
    })
  }
}
