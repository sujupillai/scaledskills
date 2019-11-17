import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as service from '../../../_service';
import { ApiPath } from '../../../_helpers/_constants/api'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  page: number = 0;
  pageSize: number = 16;
  totalTraining = 0
  RTList = [];
  searchText: string = ''
  currentLength = 0;
  userInfo: any = {};
  isLoggedIn: boolean = false;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: service.HttpService, private _SharedService: service.SharedService, private _Router: Router, private _AuthenticationService: AuthenticationService) { }
  ngOnInit() {
    this.getData();
    this.getUserInfo();
  }
  getUserInfo = () => {
    this.userInfo = this._AuthenticationService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
  }
  getData = () => {
    let postObj = {
      "userId": 0,
      "searchText": this.searchText,
      "pageSize": this.pageSize,
      "page": this.page
    }
    let url = ApiPath.homeRunningTraining
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.RTList = [];
      this.RTList = res.result.results;
      this.currentLength = this.RTList.length;
      this.totalTraining = res.result.totalCount;
    })
  }
  funNext = (page) => {
    this.page = page + 1;
    this.getData()
  }
  funPrevious = (page) => {
    this.page = page - 1;
    this.getData()
  }
  onSearchChange(searchValue) {
    this.searchText = searchValue;
    this.page = 0;
    this.currentLength = 0;
  }
  handleInterest = (item) => {
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
      let msgArray = [
        { mgs: 'You sould login first to send interest for this training.', class: 'confirmMsg' },
        { mgs: 'Do you want to login ?', class: 'subMsg' },
      ]
      this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
        if (res) {
          localStorage.setItem('returnurl', this._Router.url);
          this._Router.navigate(['/auth/login']);
        }
      })
    }
  }
}
