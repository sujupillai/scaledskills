import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiPath } from '../_helpers/_constants/api';
import { first } from 'rxjs/operators';
import { HttpService } from '../_service/http.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  countryList = [];
  stateList = [];
  trainingNeedDDL = [];
  trainingTypeDDL = [];
  globalDropdown: []
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService) {
  }
  ngOnInit() {
    this.createForm(() => {
      this.getCountryList();
      this.getGlobalMaster();
    })
  }
  createForm = (callback) => {
    this.requestForm = this._FormBuilder.group({
      needType: [0, Validators.required],
      needTypeObj: [''],
      trainingType: [0, Validators.required],
      trainingTypeObj: [0, Validators.required],
      companyName: ['', Validators.required],
      numberOfParticipant: [''],
      summery: ['', Validators.required],
      description: ['', Validators.required],
      address: this._FormBuilder.group({
        city: [''],
        zipCode: [''],
        street: [''],
        countryId: [''],
        countryObj: [''],
        stateId: [''],
        stateObj: ['']
      }),
      budget: [''],
      keywords: [''],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.requestForm.controls }
  getMaster = (url, masterCollection) => {
    this._HttpService.httpCall(url, 'GET', null, null).pipe(first()).subscribe(res => {
      if (res.responseCode == 200) {
        this[masterCollection] = res.result;
        if (masterCollection == 'globalDropdown') {
          this.getGlobalDDl(this[masterCollection])
        }
      }
    })
  }
  getGlobalDDl = (globalDropdown) => {
    this.trainingNeedDDL = globalDropdown[0].items;
    this.trainingTypeDDL = globalDropdown[1].items;
  }
  getGlobalMaster = () => {
    let url = ApiPath.globalDropdown;
    this.getMaster(url, 'globalDropdown')
  }
  getCountryList = () => {
    let url = ApiPath.globalCountry;
    this.getMaster(url, 'countryList')
  }
  getStateList = (id) => {
    const url = ApiPath.globalState + '/' + id;
    this.getMaster(url, 'stateList')
  }
  onChangeCountry(event) {
    let id = event.value.value
    this.requestForm.get(['address', 'countryId']).setValue(event.value.value)
    this.getStateList(id)
  }
  handleOnChangeId = (event, control) => {
    this.requestForm.get(control).setValue(event.value.value)
  }
  onChangeState(event) {
    this.requestForm.get(['address', 'stateId']).setValue(event.value.value)
  }
  getTrainingData = () => {
    const url = ApiPath.trainingRequest;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      /* if (res.result) {
        let dataObj = res.result[0];
        Object.keys(dataObj).forEach(name => {
          if (this.formControl[name]) {
            this.formControl[name].setValue(dataObj[name]);
          }
        });
      } */
    })
  }
  handleSubmit = () => {
    const url = ApiPath.trainingRequest;
    let postObj = {
      ...this.requestForm.value
    }
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res.result) {
        this.getTrainingData()
      }
    })
    prompt('postObj', JSON.stringify(postObj))
  }
}
