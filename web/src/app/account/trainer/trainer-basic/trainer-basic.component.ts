import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { first } from 'rxjs/operators';
import { HttpService, SharedService } from '../../../_service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-trainer-basic',
  templateUrl: './trainer-basic.component.html',
})
export class TrainerBasicComponent implements OnInit {
  profileForm: FormGroup;
  countryList = [];
  stateList = [];
  submitted: boolean = false;
  dateOfBirth = new FormControl();
  selectedCountry = [];
  selectedState = [];
  settings = {};
  defaultList = [];
  baseUrl: string = ''
  minDate: Date = new Date();
  urlConfig = {
    isUrl: false,
    isUrlValid: false,
    vrlValidationMsg: '',
    urlSubmitted: false
  }
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _Router: Router) { }
  ngOnInit() {
    this.baseUrl = window.location.origin + 'p/';
    this.createprofileForm(() => {
      this.defaultList = [{
        "text": "Select",
        "value": "0",
        "isSelect": false
      }]
      this.getCountryList();
      this.settings = {
        singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", classes: "myclass custom-class", enableSearchFilter: true, searchBy: ['text'], searchPlaceholderText: 'Search by name'
      };
      this.getProfileData();
    })
  }
  createprofileForm = (callback) => {
    this.profileForm = this._FormBuilder.group({
      id: ['0'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender: [''],
      baseUrl: [this.baseUrl],
      profileUrl: ['', Validators.required],
      dateOfBirth: [this.dateOfBirth],
      address: this._FormBuilder.group({
        address1: [''],
        address2: [''],
        address3: [''],
        zipCode: [''],
        street: [''],
        countryId: [''],
        countryObj: [],
        stateId: [''],
        stateObj: [''],
        city: [''],
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
    let url = ApiPath.globalCountry;
    this.getMaster(url, 'countryList')
  }
  getStateList = (id) => {
    const url = ApiPath.globalState + '/' + id;
    this.getMaster(url, 'stateList')
  }
  OnCountrySelect(event) {
    let id = event.value
    this.profileForm.get(['address', 'countryId']).setValue(event.value)
    this.getStateList(id)
  }
  OnCountryDeSelect(event) {
    this.profileForm.get(['address', 'countryId']).setValue('')
    this.profileForm.get(['address', 'stateId']).setValue('')
    this.profileForm.get(['address', 'stateObj']).setValue('')
    this.profileForm.get(['address', 'city']).setValue('');
    this.profileForm.get(['address', 'zipCode']).setValue('');
    this.selectedState = this.defaultList;
    this.selectedState = this.defaultList;
    this.stateList = [];
  }
  onChangeState(event) {
    this.profileForm.get(['address', 'stateId']).setValue(event.value)
  }
  OnStateDeSelect(event) {
    this.profileForm.get(['address', 'stateId']).setValue('')
    this.profileForm.get(['address', 'stateObj']).setValue('')
    this.profileForm.get(['address', 'city']).setValue('');
    this.profileForm.get(['address', 'zipCode']).setValue('');
    this.selectedState = this.defaultList;
  }
  convertDateString = (date, type) => {
    if (type == 'month') {
      var x = date.getMonth() + 1;
    } else if (type == 'date') {
      var x = date.getDate();
    }
    return x < 10 ? '0' + x : '' + x;
  }
  getProfileData = () => {
    let url = ApiPath.trainer;
    this._HttpService.httpCall(url, 'GET', null, null).pipe(first()).subscribe(res => {
      if (res.responseCode == 200) {
        let dataObj = res.result;
        Object.keys(dataObj).forEach(name => {
          if (this.formControl[name]) {
            if (name != 'address') {
              this.formControl[name].setValue(dataObj[name]);
            }
          }
        });
        if (dataObj.profileUrl) {
          this.urlConfig.isUrl = true;
        } else {
          this.urlConfig.isUrl = false;
        }
        let currentDate = dataObj.dateOfBirth ? new Date(dataObj.dateOfBirth) : ''
        this.dateOfBirth.setValue(currentDate);
        var nameStr = this.profileForm.get('firstName').value.substring(0, 4);
        if (this.dateOfBirth.value == null || this.dateOfBirth.value == '') {
          var monthStr = '00';
          var dateStr = '00'
        } else {
          var monthStr = this.convertDateString(this.dateOfBirth.value, 'month');
          var dateStr = this.convertDateString(this.dateOfBirth.value, 'date')
        }
        this.profileForm.get('referralID').setValue(nameStr + dateStr + monthStr);
        this.profileForm.get('dateOfBirth').setValue(dataObj.dateOfBirth);
        this.profileForm.get(['address', 'address1']).setValue(dataObj.address && dataObj.address.address1 ? dataObj.address.address1 : '');
        this.profileForm.get(['address', 'address2']).setValue(dataObj.address && dataObj.address.address2 ? dataObj.address.address2 : '');
        this.profileForm.get(['address', 'address3']).setValue(dataObj.address && dataObj.address.address3 ? dataObj.address.address3 : '');
        this.profileForm.get(['address', 'city']).setValue(dataObj.address && dataObj.address.city ? dataObj.address.city : 'NA');
        this.profileForm.get(['address', 'zipCode']).setValue(dataObj.address && dataObj.address.zipCode ? dataObj.address.zipCode : '');
        this.profileForm.get(['address', 'street']).setValue(dataObj.address && dataObj.address.street ? dataObj.address.street : 'NA');
        this.profileForm.get(['address', 'countryId']).setValue(dataObj.address && dataObj.address.countryId ? dataObj.address.countryId : 0);
        this.profileForm.get(['address', 'stateId']).setValue(dataObj.address && dataObj.address.stateId ? dataObj.address.stateId : 0);
        this.profileForm.get(['address', 'countryObj']).setValue(dataObj.address && dataObj.address.countryObj ? dataObj.address.countryObj : '');
        this.profileForm.get(['address', 'stateObj']).setValue(dataObj.address && dataObj.address.stateObj ? dataObj.address.stateObj : '');
        this.selectedCountry = dataObj.address && dataObj.address.countryObj ? [dataObj.address.countryObj] : this.defaultList;
        this.selectedState = dataObj.address && dataObj.address.stateObj ? [dataObj.address.stateObj] : this.defaultList;
        if (this.profileForm.get(['address', 'countryId']).value > 0) {
          let id = this.profileForm.get(['address', 'countryId']).value
          this.getStateList(id)
        }
      }
    })
  }
  get formControl() { return this.profileForm.controls }
  handleSubmit = () => {
    if (this.profileForm.invalid) {
      this.submitted = true;
      let msgArray = [
        { mgs: 'Please complete form', class: 'confirmMsg' },
      ]
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')

    } else {
      if (this.urlConfig.isUrlValid) {
        this.submitted = false;
        let postObj = {
          ...this.profileForm.value,
        }
        postObj.address.countryObj = postObj.address && postObj.address.countryObj ? postObj.address.countryObj[0] : this.defaultList[0];
        postObj.address.stateObj = postObj.address && postObj.address.stateObj ? postObj.address.stateObj[0] : this.defaultList[0];
        postObj.dateOfBirth = this.dateOfBirth.value;
        let url = ApiPath.trainer;
        this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
          if (res.result) {
            let msgArray = [
              {
                mgs: res.responseMessege ? res.responseMessege : 'Success',
                class: 'confirmMsg'
              },
            ]
            this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess');
            this.getProfileData()
          } else {
            let msgArray = [
              { mgs: 'Something went wrong', class: 'confirmMsg' }
            ]
            // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
            this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
          }
        }, error => {
          let msgArray = [
            { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        })
      }
      else {
        this.urlConfig.vrlValidationMsg = 'Please Validate url';
      }
    }
  }
  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
    this.getProfileData()
  }
  changeDate = (event) => {
    var nameStr = this.profileForm.get('firstName').value.substring(0, 4);
    if (this.dateOfBirth.value == null || this.dateOfBirth.value == '') {
      var monthStr = '00';
      var dateStr = '00'
    } else {
      var monthStr = this.convertDateString(this.dateOfBirth.value, 'month');
      var dateStr = this.convertDateString(this.dateOfBirth.value, 'date')
    }
    this.profileForm.get('referralID').setValue(nameStr + dateStr + monthStr);
  }
  handleCancel = () => {
    let msgArray = [
      { mgs: 'Are you sure, you want to cancel ?', class: 'confirmMsg' },
      { mgs: 'Unsaved changes will not be saved.', class: 'subMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
      if (res == 1) {
        this.resetForm(this.profileForm)
      }
    })
  }
  updateUrl = () => {
    this.urlConfig.isUrlValid = false;
    this.urlConfig.vrlValidationMsg = 'Please validate url';
    this.urlConfig.urlSubmitted = false;
    let urlStr = (this.formControl['profileUrl'].value).split(' ').join('_')
    this.formControl['profileUrl'].setValue(urlStr);
  }
  viewProfile() {
    let val = window.location.origin + '/#/view/p/' + this.formControl['profileUrl'].value;
    window.open(val, "_blank");
  }
  validateUrl = () => {
    this.urlConfig.vrlValidationMsg = '';
    this.urlConfig.urlSubmitted = true;
    const url = ApiPath.trainerVU;
    let params = {
      url: this.formControl['profileUrl'].value
    }
    this._HttpService.httpCall(url, 'GET', null, params).subscribe(res => {
      if (res.responseCode == 200 && res.result) {
        this.urlConfig.isUrlValid = true;
      } else {
        this.urlConfig.isUrlValid = false;
      }
      this.urlConfig.vrlValidationMsg = this.urlConfig.isUrlValid ? 'Url is available.' : 'Url is already used with other.';
    })
  }
}
