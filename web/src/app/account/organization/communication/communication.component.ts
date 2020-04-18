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
  masterData = {
    organization: [],
    trainings: [],
  };
  settings;
  multiSettings;
  entity = {};
  postData = {}
  constructor(private _HttpService: HttpService) { }
  ngOnInit() {
    this.settings = { singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items', enableSearchFilter: true, searchPlaceholderText: 'Search by name' };
    this.multiSettings = { singleSelection: false, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items', badgeShowLimit: 1 };
    this.getOrgData();
    this.getUserTypes('userTypes');
  }
  _httpGetMaster = (url, key, body, param, method) => {
    this._HttpService.httpCall(url, method, body, param).subscribe(res => {
      if (res.result) {
        this.masterData[key] = res.result;
      }
    })
  }
  getOrgData = () => {
    let url = ApiPath.organizationList
    this._httpGetMaster(url, 'organization', null, null, 'GET')
  }
  getTrainings = (key) => {
    let ids = this.getArray(key);
    let url = ApiPath.communicationTrainings;
    let params = {
      url: ids ? ids : 0
    }
    this._httpGetMaster(url, 'trainings', null, params, 'GET')
  }
  getUsers = (key, usersType) => {
    let ids = this.getArray('trainings');
    let url = ApiPath.communicationTrainingsUser;
    let params = {
      users: usersType
    }
    this._httpGetMaster(url, 'users', ids, params, 'POST')
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
  getArray = (key) => {
    var array = [];
    this.entity[key].forEach(element => {
      array.push(element.value)
    });
    return array
  }
  onSelect(event, key) {
    if (key == 'organization') {
      this.getTrainings('organization')
      this.entity['trainings'] = []
      this.entity['userTypes'] = [];
      this.entity['users'] = [];

    } if (key == 'trainings') {
      this.entity['userTypes'] = [];
      this.entity['users'] = [];
    } else if (key == 'userTypes') {
      this.getUsers('users', event.value);
      this.entity['users'] = [];
    }
  }
  OnDeSelect(event, key) {
    if (key == 'organization') {
      this.getTrainings('organization')
      this.entity['trainings'] = []
      this.entity['userTypes'] = [];
      this.entity['users'] = [];

    } if (key == 'trainings') {
      this.entity['userTypes'] = [];
      this.entity['users'] = [];
    } else if (key == 'userTypes') {
      this.getUsers('users', event.value);
      this.entity['users'] = [];
    }
  }

  handleSubmit = () => {
    let array = []
    this.entity['users'].forEach(element => {
      array.push(element.value)
    });
    this.postData = {
      ...this.postData,
      emails: array
    }

  }
}
