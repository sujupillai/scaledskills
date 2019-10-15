import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService, SharedService } from '../../../_service';
import { first } from 'rxjs/operators';
import { ApiPath } from '../../../_helpers/_constants/api';
@Component({
  selector: 'app-org-basic',
  templateUrl: './org-basic.component.html'
})
export class OrgBasicComponent implements OnInit {
  formElement: FormGroup;
  submitted: boolean = false;
  fileData = null;
  selectedCountry = [];
  selectedState = [];
  settings = {};
  defaultList = [{
    "text": "Select",
    "value": "0",
    "isSelect": false
  }];
  countryList = [];
  stateList = [];
  isCopied: boolean = false;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService) { }
  ngOnInit() {
    this.createForm(() => {
      this.getCountryList();
      this.settings = {
        singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", classes: "myclass custom-class", enableSearchFilter: true, searchBy: ['text'], searchPlaceholderText: 'Search by name'
      };
      this.fetchData()
    })
  }
  createForm = (callback: any): void => {
    this.formElement = this._FormBuilder.group({
      name: ['', Validators.required],
      ownerName: ['', Validators.required],
      baseUrl: [window.location.origin + '/o/'],
      profileUrl: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gst: ['', [Validators.minLength(15), Validators.maxLength(15)]],
      panNumber: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      idProof: [''],
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
        city: ['']
      }),
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.formElement.controls };
  setAddress = (dataObj) => {
    this.formElement.get(['address', 'address1']).setValue(dataObj.address && dataObj.address.address1 ? dataObj.address.address1 : 'NA');
    this.formElement.get(['address', 'address2']).setValue(dataObj.address && dataObj.address.address2 ? dataObj.address.address2 : 'NA');
    this.formElement.get(['address', 'address3']).setValue(dataObj.address && dataObj.address.address3 ? dataObj.address.address3 : 'NA');
    this.formElement.get(['address', 'city']).setValue(dataObj.address && dataObj.address.city ? dataObj.address.city : 'NA');
    this.formElement.get(['address', 'zipCode']).setValue(dataObj.address && dataObj.address.zipCode ? dataObj.address.zipCode : 'NA');
    this.formElement.get(['address', 'street']).setValue(dataObj.address && dataObj.address.street ? dataObj.address.street : 'NA');
    this.formElement.get(['address', 'countryId']).setValue(dataObj.address && dataObj.address.countryId ? dataObj.address.countryId : 0);
    this.formElement.get(['address', 'stateId']).setValue(dataObj.address && dataObj.address.stateId ? dataObj.address.stateId : 0);
    this.formElement.get(['address', 'countryObj']).setValue(dataObj.address && dataObj.address.countryObj ? dataObj.address.countryObj : 'NA');
    this.formElement.get(['address', 'stateObj']).setValue(dataObj.address && dataObj.address.stateObj ? dataObj.address.stateObj : 'NA');
    this.selectedCountry = dataObj.address && dataObj.address.countryObj ? [dataObj.address.countryObj] : this.defaultList;
    this.selectedState = dataObj.address && dataObj.address.stateObj ? [dataObj.address.stateObj] : this.defaultList;
    if (this.formElement.get(['address', 'countryId']).value > 0) {
      let id = this.formElement.get(['address', 'countryId']).value
      this.getStateList(id)
    }
  }
  fetchData = () => {
    let url = ApiPath.Organization;
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
        let urlStr = (this.formControl['name'].value).split(' ').join('_')
        this.formControl['profileUrl'].setValue(urlStr)
        this.setAddress(dataObj)
      }
    })
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
    this.formElement.get(['address', 'countryId']).setValue(event.value)
    this.getStateList(id)
  }
  OnCountryDeSelect(event) {
    this.formElement.get(['address', 'countryId']).setValue('')
    this.formElement.get(['address', 'stateId']).setValue('')
    this.formElement.get(['address', 'stateObj']).setValue('')
    this.formElement.get(['address', 'city']).setValue('');
    this.formElement.get(['address', 'zipCode']).setValue('');
    this.selectedState = this.defaultList;
    this.selectedState = this.defaultList;
    this.stateList = [];
  }
  onChangeState(event) {
    this.formElement.get(['address', 'stateId']).setValue(event.value)
  }
  OnStateDeSelect(event) {
    this.formElement.get(['address', 'stateId']).setValue('')
    this.formElement.get(['address', 'stateObj']).setValue('')
    this.formElement.get(['address', 'city']).setValue('');
    this.formElement.get(['address', 'zipCode']).setValue('');
    this.selectedState = this.defaultList;
  }
  upateUrl = () => {
    let urlStr = (this.formControl['name'].value).split(' ').join('_')
    this.formControl['profileUrl'].setValue(urlStr)
  }
  copyText() {
    let urlStr = (this.formControl['name'].value).split(' ').join('_')
    this.formControl['profileUrl'].setValue(urlStr)
    let val = window.location.origin + '/#/view/o/' + this.formControl['profileUrl'].value;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    this.isCopied = true;
    document.body.removeChild(selBox);
    setTimeout(() => {
      this.isCopied = false;
    }, 2000);
  }
  myUploader = (event, control) => {
    this.fileData = <File>event.files[0];
    let url = ApiPath.documentUpload
    const formData = new FormData();
    formData.append('file', this.fileData);
    this._HttpService.httpCall(url, 'POST', formData, null).subscribe(res => {
      this.formControl[control].setValue(res.result)
    })
  }
  handleSubmit = () => {
    const url = ApiPath.Organization;
    let postObj = {
      ...this.formElement.value
    }
    postObj.address.countryObj = this.formElement.get(['address', 'countryObj']).value[0];
    postObj.address.stateObj = this.formElement.get(['address', 'stateObj']).value[0];
    if (this.formElement.valid) {
      this.submitted = false;
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res && res.responseCode == 406) {
          /* server side validation mesages */
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Message')
        } else if (res && res.responseCode == 200) {
          /* success  */
          let msgArray = [
            {
              mgs: res && res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess');
          this.fetchData();
        } else {
          /* any other error */
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        }
      }, error => {
        let msgArray = [
          { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
      })
    } else {
      this.submitted = true;
      let msgArray = [
        { mgs: 'Please complete form', class: 'confirmMsg' },
      ]
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
    }
  }
}