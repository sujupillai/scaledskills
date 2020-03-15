import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as service from '../../_service';
import { MustMatch } from '../../_helpers/_validators/must-match.validator';
import { ApiPath } from '../../_helpers/_constants/api'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';
  submitted: boolean = false;
  countryList = [];
  selectedCountry = [{ "text": "INDIA", "value": "1", "isSelect": true }];
  defaultList = [{
    "text": "Select",
    "value": "0",
    "isSelect": false
  }];
  settings = {};
  inputType = 'password'
  countrySettings = {};
  constructor(private _FormBuilder: FormBuilder, private _HttpService: service.HttpService, private _SharedService: service.SharedService, private _Router: Router) { }
  ngOnInit() {
    this.createForm(() => {
      this.settings = {
        singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", classes: "myclass custom-class", enableSearchFilter: true, searchBy: ['text'], searchPlaceholderText: 'Search by name'
      };
      this.getCountryList();
    })
  }
  createForm = (callback: any): void => {
    this.registerForm = this._FormBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
        userName: '',
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        id: 0,
        countryObj: [''],
        countryCode: [''],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    )
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.registerForm.controls }
  getMaster = (url, masterCollection) => {
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.responseCode == 200) {
        this[masterCollection] = res.result;
      }
    })
  }
  getCountryList = () => {
    let url = ApiPath.globalCountry;
    this.getMaster(url, 'countryList')
  }
  OnCountrySelect(event) {
    this.registerForm.get('countryCode').setValue(event.value)
  }
  OnCountryDeSelect(event) {
    this.registerForm.get('countryCode').setValue(null)
    this.registerForm.get('countryObj').setValue([])
  }
  handleEyeType = () => {
    this.inputType = this.inputType == 'text' ? 'password' : 'text'
  }
  handleSubmitForm = () => {
    if (this.registerForm.invalid) {
      this.submitted = true;
      return
    } else {
      this.submitted = false;
      let url = ApiPath.register;
      let postObj = {
        ...this.registerForm.value
      };
      let params = {
        auth: false
      }
      this._HttpService.httpCall(url, 'POST', postObj, params).subscribe(res => {
        if (res && res.responseCode == 406) {
          let msgArray = [
            { mgs: res.responseMessege, class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Message')
        } else if (res && res.responseCode == 200) {
          let msgArray = [
            { mgs: res.responseMessege, class: 'confirmMsg' },
            { mgs: 'Please check your registered email id for verify your account after two minutes.', class: 'subMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess').subscribe(res => {
            this._Router.navigate(['/'])
          })
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      },
        error => {
          let msgArray = [
            { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        });
    }
  }
}
