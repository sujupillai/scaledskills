import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { first } from 'rxjs/operators';
import { HttpService, SharedService } from '../../../_service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  profileForm: FormGroup;
  countryList = [];
  stateList = [];
  submitted: boolean = false;
  dateOfBirth = new FormControl();
  selectedCountry = [];
  selectedState = [];
  settings = {};
  defaultList = [];
  minDate: Date= new Date();
  basicApi = '';
  isGeneralUser: boolean = true;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _Router: Router) { }
  ngOnInit() {
    this.createprofileForm(() => {
      this.defaultList = [{
        "text": "Select",
        "value": "0",
        "isSelect": false
      }]
      this.getProfileData();
      this.getCountryList();
      this.settings = { singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items' };
      if (this._Router.url.indexOf('account/trainer/profile/basic') >= 0) {
        this.isGeneralUser = false;

      } else {
        this.isGeneralUser = true;
      }
    })
  }
  createprofileForm = (callback) => {
    this.profileForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: [this.dateOfBirth, Validators.required],
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
      isTrainer: this.isGeneralUser ? false : true
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
  onChangeCountry(event) {
    let id = event.value
    this.profileForm.get(['address', 'countryId']).setValue(event.value)
    this.getStateList(id)
  }
  onChangeState(event) {
    this.profileForm.get(['address', 'stateId']).setValue(event.value)
  }
  getProfileData = () => {
    let url = ApiPath.userBasic;
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
        let currentDate = new Date(dataObj.dateOfBirth)
        this.dateOfBirth.setValue(currentDate);
        this.profileForm.get('dateOfBirth').setValue(dataObj.dateOfBirth);
        this.profileForm.get(['address', 'address1']).setValue(dataObj.address && dataObj.address.address1 ? dataObj.address.address1 : 'NA');
        this.profileForm.get(['address', 'address2']).setValue(dataObj.address && dataObj.address.address2 ? dataObj.address.address2 : 'NA');
        this.profileForm.get(['address', 'address3']).setValue(dataObj.address && dataObj.address.address3 ? dataObj.address.address3 : 'NA');
        this.profileForm.get(['address', 'city']).setValue(dataObj.address && dataObj.address.city ? dataObj.address.city : 'NA');
        this.profileForm.get(['address', 'zipCode']).setValue(dataObj.address && dataObj.address.zipCode ? dataObj.address.zipCode : 'NA');
        this.profileForm.get(['address', 'street']).setValue(dataObj.address && dataObj.address.street ? dataObj.address.street : 'NA');
        this.profileForm.get(['address', 'countryId']).setValue(dataObj.address && dataObj.address.countryId ? dataObj.address.countryId : 'NA');
        this.profileForm.get(['address', 'stateId']).setValue(dataObj.address && dataObj.address.stateId ? dataObj.address.stateId : 'NA');
        this.profileForm.get(['address', 'countryObj']).setValue(dataObj.address && dataObj.address.countryObj ? dataObj.address.countryObj : 'NA');
        this.profileForm.get(['address', 'stateObj']).setValue(dataObj.address && dataObj.address.stateObj ? dataObj.address.stateObj : 'NA');
        this.selectedCountry = [dataObj.address.countryObj ? dataObj.address.countryObj : this.defaultList];
        this.selectedState = [dataObj.address.stateObj ? dataObj.address.stateObj : this.defaultList];
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
      this.submitted = false;
      let url = ApiPath.userBasic;
      let postObj = {
        ...this.profileForm.value,
      }
      postObj.address.countryObj = postObj.address.countryObj[0];
      postObj.address.stateObj = postObj.address.stateObj[0];
      postObj.dateOfBirth = this.dateOfBirth.value;
      this._HttpService.httpCall(url, 'PUT', postObj, null).subscribe(res => {
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
  handleCancel = () => {
    let msgArray = [
      { mgs: 'Are you sure, you want to cancel ?', class: 'confirmMsg' },
      { mgs: 'Unsaved changes will not be saved.', class: 'subMsg' },
    ]
    // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
      if (res == 1) {
        this.resetForm(this.profileForm)
      }
    })
  }
}
