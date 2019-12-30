import { Component, OnInit } from '@angular/core';
import * as service from '../../../_service';
import { ApiPath } from '../../../_helpers/_constants/api'
@Component({
  selector: 'app-attendee-view',
  templateUrl: './attendee-view.component.html'
})
export class AttendeeViewComponent implements OnInit {
  cancelTrainings = []
  upcomingTrainings = []
  pastTrainings = []
  noRecord = [
    { msg: 'No records to display' }
  ];
  constructor(private _HttpService: service.HttpService) { }
  ngOnInit() {
    this.upcomingTraining();
    this.pastTraining();
    //this.cancelTraining()
  }
  upcomingTraining = () => {
    let postObj = {
      "userId": 0,
      'pageType': 'p',
      "searchText": "",
      "pageSize": 16,
      "page": 0
    }
    let url = ApiPath.upcomingTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.upcomingTrainings = res.result.results;
    })
  }
  pastTraining = () => {
    let postObj = {
      "userId": 0,
      'pageType': 'p',
      "searchText": "",
      "pageSize": 16,
      "page": 0
    }
    let url = ApiPath.pastTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.pastTrainings = res.result.results;
    })
  }
  cancelTraining = () => {
    let postObj = {
      "userId": 0,
      'pageType': 'p',
      "searchText": "",
      "pageSize": 16,
      "page": 0
    }
    let url = ApiPath.cancelTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.cancelTrainings = res.result.results;
    })
  }
  page: any;
  setPage(page) {
    // alert(page)
    // this.page = page;
  }
}
