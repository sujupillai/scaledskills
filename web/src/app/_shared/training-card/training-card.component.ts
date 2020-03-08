import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as service from '../../_service';
import { ApiPath } from '../../_helpers/_constants/api'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service';
@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
})
export class TrainingCardComponent implements OnInit {
  userInfo: any = {};
  @Input() item;
  @Input() refCode;
  isLoggedIn: boolean = false;
  constructor(private _HttpService: service.HttpService, private _SharedService: service.SharedService, private _Router: Router, private _AuthenticationService: AuthenticationService) { }
  ngOnInit() {
    this.getUserInfo();
  }
  getUserInfo = () => {
    this.userInfo = this._AuthenticationService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
  }
  handleInterest = (item) => {
    if (this.isLoggedIn) {
      let url = ApiPath.interest;
      url = url.replace('{TrainingId}', item.trainingId.toString())
      let postData = {
        isInterest: !item.isInterest
      }
      this._HttpService.httpCall(url, 'POST', postData, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          item.interestCount = res['result'];
          item.isInterest = !item.isInterest;
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      })
    } else {
      let msgArray = [
        { mgs: 'You should login first to show interest for this training.', class: 'confirmMsg' },
        { mgs: 'Do you want to login ?', class: 'subMsg' },
      ]
      this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Information').subscribe(res => {
        if (res) {
          localStorage.setItem('returnurl', this._Router.url);
          this._Router.navigate(['/auth/login']);
        }
      })
    }
  }
}
