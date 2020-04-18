import { Component, OnInit } from '@angular/core';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService } from 'src/app/_service';
@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html'
})
export class CommunicationComponent implements OnInit {
  defaultList = [{
    "text": "Select",
    "value": "0",
    "isSelect": false
  }]
  masterData = {};
  multiSettings;
  entity = {};
  postData = {}
  constructor(private _HttpService: HttpService) { }
  ngOnInit() {
    this.multiSettings = { singleSelection: false, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items', badgeShowLimit: 1 };
    this.getOrgData();
    this.getUserTypes('userTypes')

  }
  getOrgData = () => {
    let url = ApiPath.organizationList
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.result) {
        this.masterData['organization'] = res.result;
      }
    })
  }
  getArray = (key) => {
    var array = [];
    this.entity[key].forEach(element => {
      array.push(element.value)
    });
    return array

  }
  getTrainings = (key) => {
    let ids = this.getArray(key);
    let url = ApiPath.communicationTrainings;
    let params = {
      url: ids ? ids : 0
    }
    this._HttpService.httpCall(url, 'GET', null, params).subscribe(res => {
      if (res.result) {
        this.masterData['trainings'] = res.result;
      }
    })
  }
  getUserTypes = (key) => {
    let data = [
      {
        "text": "Registered",
        "value": "1",
        "isSelect": false
      },
      {
        "text": "Pending Registration",
        "value": "2",
        "isSelect": false
      },
      {
        "text": "Interested",
        "value": "3",
        "isSelect": false
      },
      {
        "text": "Feedback Received",
        "value": "4",
        "isSelect": false
      }
    ]
    this.masterData[key] = data;
  }
  onSelect(event, key) {
    this.postData[key] = this.getArray(key);
    if (key == 'organization') {
      this.getTrainings('organization')
    }
  }
  OnDeSelect(event, key) {
    this.postData[key] = this.getArray(key);
    if (key == 'organization') {
      this.getTrainings('organization')
    }
  }
  handleSubmit = () => {
  }
}
