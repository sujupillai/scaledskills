import { Component, OnInit } from '@angular/core';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService, SharedService, AuthenticationService } from 'src/app/_service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DownloadCSVService } from 'src/app/_service/downloadService';
@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html'
})
export class CommunicationComponent implements OnInit {
  trainingBasicForm: FormGroup;
  submitted: boolean = false;
  userInfo: any = {};
  isLoggedIn: boolean = false;
  defaultList = [{
    "text": "Select",
    "value": "0",
    "isSelect": false
  }]
  masterData = {
    hostedBy: [{ text: 'Individual', value: '1' }, { text: 'Organization', value: '2' }],
    organization: [{
      text: 'Individual', value: '1'
    },
    { text: 'Organization', value: '2' }
    ],
    trainings: [],
    userTypes: [],
    users: [],
  };
  settings;
  multiSettings;
  entity = {};
  postData = {}
  constructor(private _HttpService: HttpService, private _FormBuilder: FormBuilder, private _SharedService: SharedService, private _DownloadCSVService: DownloadCSVService, private _AuthenticationService: AuthenticationService) { }
  ngOnInit() {
    this.createForm(() => { })
    this.settings = { singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items', enableSearchFilter: true, searchPlaceholderText: 'Search by name' };
    this.multiSettings = { singleSelection: false, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items', badgeShowLimit: 1 };
    this.getUserInfo();
    this.getUserTypes('userTypes');
  }
  _httpGetMaster = (url, key, body, param, method) => {
    this._HttpService.httpCall(url, method, body, param).subscribe(res => {
      if (res.result) {
        this.masterData[key] = res.result;
      }
    })
  }
  createForm = (callback: any): void => {
    this.trainingBasicForm = this._FormBuilder.group({
      emails: ['', Validators.required],
      emailSubject: ['', Validators.required],
      emailBody: ['', Validators.required]
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.trainingBasicForm.controls }
  getUserInfo = () => {
    this.userInfo = this._AuthenticationService.currentUserValue;
    this.isLoggedIn = this.userInfo ? true : false;
  }
  getOrgData = () => {
    let url = ApiPath.CommunicationOrganization
    this._httpGetMaster(url, 'organization', null, null, 'GET')
  }
  getIndividualTrainings = (key, id) => {
    let url = ApiPath.communicationTrainings;
    let params = {
      training_Hosted: id ? id : 0
    }
    this._httpGetMaster(url, 'trainings', null, params, 'GET')
  }
  getOrgTrainings = (key, id) => {
    let url = ApiPath.CommunicationOrganizationTtraining;
    let orgs = this.getArray('organization');
    this._httpGetMaster(url, 'trainings', orgs, null, 'POST')
  }
  getUsers = (key, usersType) => {
    let trainings = this.getArray('trainings');
    let userTypes = this.getArray('userTypes');
    let url = ApiPath.communicationTrainingsUser;
    let data = {
      trainings: trainings,
      userTypes: userTypes
    }
    let params = {
      users: usersType
    }
    this._httpGetMaster(url, 'users', data, null, 'POST')
  }
  getUserTypes = (key) => {
    let data = [
      {
        "text": "Registered",
        "value": "1",
        "isSelect": false
      },
      {
        "text": "Interested",
        "value": "2",
        "isSelect": false
      },
      {
        "text": "Member",
        "value": "3",
        "isSelect": false
      },
      {
        "text": "Pending Registration",
        "value": "4",
        "isSelect": false
      },
      {
        "text": "Feedback Received",
        "value": "5",
        "isSelect": false
      }
    ]
    this.masterData[key] = data;
  }
  getArray = (key) => {
    var array = [];
    this.entity[key] && this.entity[key].length > 0 && this.entity[key].forEach(element => {
      array.push(element.value)
    });
    return array
  }
  onSelect(event, key) {
    if (key == 'hostedBy' && event.value == 1) {
      this.getIndividualTrainings('organization', event.value);
      this.entity['organization'] = []
      this.entity['trainings'] = []
      this.entity['userTypes'] = [];
      this.entity['users'] = [];
    } else if (key == 'hostedBy' && event.value == 2) {
      this.getOrgData()
      this.entity['organization'] = []
      this.entity['trainings'] = []
      this.entity['userTypes'] = [];
      this.entity['users'] = [];
    } else if (key == 'organization') {
      this.getOrgTrainings('organization', event.value)
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
    if (key == 'hostedBy' && event.value == 1) {
      this.getIndividualTrainings('organization', event.value);
      this.entity['organization'] = []
      this.entity['trainings'] = []
      this.entity['userTypes'] = [];
      this.entity['users'] = [];
    } else if (key == 'hostedBy' && event.value == 2) {
      this.getOrgData()
      this.entity['organization'] = []
      this.entity['trainings'] = []
      this.entity['userTypes'] = [];
      this.entity['users'] = [];
    } else if (key == 'organization') {
      this.getOrgTrainings('organization', event.value)
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
    this.entity['users'] && this.entity['users'].length > 0 && this.entity['users'].forEach(element => {
      array.push(element.value)
    });
    this.formControl.emails.setValue(array);
    this.postData = this.trainingBasicForm.value;
    if (this.trainingBasicForm.invalid) {
      this.submitted = true;
      let msgArray = [
        { mgs: 'Please complete form.', class: 'confirmMsg' }
      ]
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Message')
    } else {
      let url = ApiPath.communicationTrainingsEmail;
      let emailBody = document.getElementById('msgBody').innerHTML
      let data = {
        ...this.postData,
        emailBody: emailBody,
        emails: array
      }
      this._HttpService.httpCall(url, 'POST', data, null).subscribe(res => {
        let msgArray = [
          { mgs: res.responseMessege ? res.responseMessege : 'Success', class: 'confirmMsg' }
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Success')
      }, error => {
        let msgArray = [
          { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      })
    }
  }
  download() {
    this._DownloadCSVService.downloadFile(this.masterData['users'], 'usersList');
  }
}
