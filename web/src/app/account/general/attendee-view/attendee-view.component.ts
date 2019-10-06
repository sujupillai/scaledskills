import { Component, OnInit } from '@angular/core';
import * as service from '../../../_service';
import { ApiPath } from '../../../_helpers/_constants/api'
@Component({
  selector: 'app-attendee-view',
  templateUrl: './attendee-view.component.html'
})
export class AttendeeViewComponent implements OnInit {
  pastTrainingData = []
  upcomingTrainingData = []
  cancelTrainingData = []
  constructor(private _HttpService: service.HttpService) { }
  ngOnInit() {
    this.upcomingTraining();
    this.pastTraining();
    this.cancelTraining()
  }
  upcomingTraining = () => {
    let postObj = {
      "userId": 0,
      "searchText": "",
      "pageSize": 16,
      "page": 0
    }
    let url = ApiPath.upcomingTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.upcomingTrainingData = res.result.results;
    })
  }
  pastTraining = () => {
    let postObj = {
      "userId": 0,
      "searchText": "",
      "pageSize": 16,
      "page": 0
    }
    let url = ApiPath.pastTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.pastTrainingData = res.result.results;
    })
  }
  cancelTraining = () => {
    let postObj = {
      "userId": 0,
      "searchText": "",
      "pageSize": 16,
      "page": 0
    }
    let url = ApiPath.pastTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.cancelTrainingData = res.result.results;
    })
  }
  page: any;
  setPage(page) {
    // alert(page)
    // this.page = page;
  }
}
