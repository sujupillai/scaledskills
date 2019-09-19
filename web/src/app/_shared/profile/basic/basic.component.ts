import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as profileConstant from '../../../_helpers/_constants/api';
import { first } from 'rxjs/operators';
import { HttpService } from '../../../_service/http.service';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  profileForm: FormGroup;
  countryList = [];
  stateList = [];
  submitted: boolean = false;
  phoneNumber = new FormControl();
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService) { }
  ngOnInit() {
    this.createprofileForm(() => {
      this.getUserPofile();
      this.getCountryList();
    })
  }
  createprofileForm = (callback) => {
    this.profileForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [this.phoneNumber.value, Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: this._FormBuilder.group({
        address1: [''],
        address2: [''],
        address3: [''],
        zipCode: [''],
        street: [''],
        countryId: [''],
        countryObj: [''],
        stateId: [''],
        stateObj: [''],
        city: [''],
        cityObj: [''],
      }),
      isInterAffiliatePartner: false,
      referralID: '',
      isTrainer: true
    })
    if (callback) {
      callback();
    }
  }
  getMaster = (url, masterCollection) => {
    this._HttpService.httpCall(url, 'GET', null, null).pipe(first()).subscribe(res => {
      if (res.responseCode == 200) {
        this[masterCollection] = res.result
      }
    })
  }
  getCountryList = () => {
    let url = profileConstant.ApiPath.globalCountry;
    this.getMaster(url, 'countryList')
  }
  getStateList = (id) => {
    const url = profileConstant.ApiPath.globalState + '/' + id;
    this.getMaster(url, 'stateList')
  }
  onChangeCountry(event) {
    alert('onchange')
    let id = event.value.value
    this.profileForm.get(['address', 'countryId']).setValue(event.value.value)
    this.getStateList(id)
  }
  onChangeState(event) {
    alert('onchange')
    this.profileForm.get(['address', 'stateId']).setValue(event.value.value)
  }
  getUserPofile = () => {
    let url = profileConstant.ApiPath.userBasic;
    this._HttpService.httpCall(url, 'GET', null, null).pipe(first()).subscribe(res => {
      if (res.responseCode == 200) {
        let dataObj = res.result;
        debugger
        Object.keys(dataObj).forEach(name => {
          if (this.formControl[name]) {
            if (name != 'address') {
              this.formControl[name].setValue(dataObj[name]);
            }
          }
        });
        this.profileForm.get(['address', 'address1']).setValue('');
        this.profileForm.get(['address', 'address2']).setValue('');
        this.profileForm.get(['address', 'address3']).setValue('');
        this.profileForm.get(['address', 'city']).setValue('');
        this.profileForm.get(['address', 'zipCode']).setValue('');
        this.profileForm.get(['address', 'street']).setValue('');
        this.profileForm.get(['address', 'countryId']).setValue('');
        this.profileForm.get(['address', 'stateId']).setValue('');
      }
    })
  }
  get formControl() { return this.profileForm.controls }
  handleSubmit = () => {
    this.submitted = true;
    let url = profileConstant.ApiPath.userBasic;
    let postData = {
      ...this.profileForm.value,
    }
    this._HttpService.httpCall(url, 'PUT', postData, null).subscribe(res => {
      if (res.result) {
        this.getUserPofile()
      }
    })
  }
}
