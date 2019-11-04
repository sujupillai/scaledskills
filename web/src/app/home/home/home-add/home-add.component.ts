import { Component, OnInit } from '@angular/core';
import * as service from '../../../_service';
import { ApiPath } from '../../../_helpers/_constants/api'
import { AuthenticationService } from '../../../_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
})
export class HomeAddComponent implements OnInit {
  carouselItems = [];
  noRecord = [
    { msg: 'No records to display' }
  ];
  userInfo: any = {};
  isLoggedIn: boolean = false;
  constructor(private _HttpService: service.HttpService, private _AuthenticationService: AuthenticationService, private _SharedService: service.SharedService, private _Router: Router) { }
  ngOnInit() {
    this.getData()
  }
  getData = () => {
    let url = ApiPath.headerTraining;
    let params = {
      auth: false
    }
    url = url.replace('{urlName}', ' ')
    this._HttpService.httpCall(url, 'GET', null, params).subscribe(res => {
      this.carouselItems = res.result.trainings;
    })
  }
  fetchUserInfo = (item) => {
    this.userInfo = this._AuthenticationService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
    if (this.isLoggedIn) {
      let url = ApiPath.interest;
      url = url.replace('{TrainingId}', item.trainingId.toString())
      this._HttpService.httpCall(url, 'POST', item.trainingId, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Success', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Success')
          item.interestCount = res['result'];
          item.isInterested = true;
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        }
      })
    } else {
      localStorage.setItem('returnurl', this._Router.url);
      this._Router.navigate(['/auth/login']);
    }
  }
  handleInterest = (item) => {
    this.fetchUserInfo(item)
  }
  /* setPage(page) {
    //prompt('page', JSON.stringify(page));
    // this.page = page;
  } */
}
