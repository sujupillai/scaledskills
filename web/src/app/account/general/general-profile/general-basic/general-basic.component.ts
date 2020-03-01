import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../../_helpers/_constants/api';
import { first } from 'rxjs/operators';
import { HttpService, SharedService } from '../../../../_service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-general-basic',
  templateUrl: './general-basic.component.html',
})
export class GeneralBasicComponent implements OnInit {
  profileForm: FormGroup;
  countryList = [];
  entity;
  curentYear=(new Date()).getFullYear();
  imageBaseHref=window.location.origin + '/api/Document/p/';
  stateList = [];
  submitted: boolean = false;
  dateOfBirth = new FormControl();
  uploadedFiles: any[] = [];
  uplo: File;
  selectedCountry = [];
  selectedState = [];
  noImage=true;
  settings = {};
  defaultList = [];
  minDate: Date = new Date();
  basicApi = '';
  isGeneralUser: boolean = true;
  isReferralID = false;
  documentUpload: string = '';
  prevData={};
  fileData = null;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _Router: Router) { }
  ngOnInit() {
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
      if (this._Router.url.indexOf('account/trainer/profile/basic') >= 0) {
        this.basicApi = ApiPath.trainer;
        this.isGeneralUser = false;
      } else {
        this.basicApi = ApiPath.userBasic
        this.isGeneralUser = true;
      }
      this.getProfileData(this.basicApi);
    })
  }
  createprofileForm = (callback) => {
    this.profileForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      image: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender: ['', Validators.required],
      dateOfBirth: [this.dateOfBirth, Validators.required],
      address: this._FormBuilder.group({
        address1: ['', Validators.required],
        address2: [''],
        address3: [''],
        zipCode: ['', [Validators.required, Validators.minLength(6)]],
        street: [''],
        countryId: ['', Validators.required],
        countryObj: [],
        stateId: [''],
        stateObj: [''],
        city: ['', Validators.required],
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
  OnCountrySelect(event) {
    let id = event.value
    this.profileForm.get(['address', 'countryId']).setValue(event.value)
    this.getStateList(id)
  }
  OnCountryDeSelect(event) {
    this.profileForm.get(['address', 'countryId']).setValue('')
    this.profileForm.get(['address', 'countryObj']).setValue('')
    this.profileForm.get(['address', 'stateId']).setValue('')
    this.profileForm.get(['address', 'stateObj']).setValue('')
    this.profileForm.get(['address', 'city']).setValue('');
    this.profileForm.get(['address', 'zipCode']).setValue('');
    this.selectedState = this.defaultList;
    this.selectedState = this.defaultList;
    this.stateList = [];
  }
  removeProfileFile=(event, control)=>{
    this.formControl[control].setValue(this.prevData['image']);
    this.entity.image=this.formControl[control].value;
  }
  myUploader = (event, control) => {
    this.noImage=true;
    this.fileData = <File>event.files[0];
    let url = ApiPath.documentUpload
    const formData = new FormData();
    formData.append('file', this.fileData);
    this._HttpService.httpCall(url, 'POST', formData, null).subscribe(res => {
      this.formControl[control].setValue(res.result);
      this[control] = false;
      this.noImage=false;
      this.entity.image=this.imageBaseHref+res.result;
    })
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
  getProfileData = (url) => {
    this._HttpService.httpCall(url, 'GET', null, null).pipe(first()).subscribe(res => {
      if (res.responseCode == 200) {
        let dataObj = res.result;
        this.entity={...dataObj};
        
        Object.keys(dataObj).forEach(name => {
          if (this.formControl[name]) {
            if (name != 'address') {
              this.formControl[name].setValue(dataObj[name]);
            }
          }
        });
        if(!this.entity.image){
          this.noImage=true;
        }else{
          this.entity.image='http://scaledskills.com/api/Document/p/'+dataObj.image;
          this.noImage=false;
        }
        
        let currentDate = dataObj.dateOfBirth ? new Date(dataObj.dateOfBirth) : ''
        this.dateOfBirth.setValue(currentDate);
        this.profileForm.get('referralID').setValue(dataObj.referralID);
        
        if (dataObj.referralID) {
          this.isReferralID = true
        } else {
          this.isReferralID = false
        }
        this.profileForm.get('dateOfBirth').setValue(dataObj.dateOfBirth ? dataObj.dateOfBirth : '');
        this.profileForm.get(['address', 'address1']).setValue(dataObj.address && dataObj.address.address1 ? dataObj.address.address1 : '');
        this.profileForm.get(['address', 'address2']).setValue(dataObj.address && dataObj.address.address2 ? dataObj.address.address2 : '');
        this.profileForm.get(['address', 'address3']).setValue(dataObj.address && dataObj.address.address3 ? dataObj.address.address3 : '');
        this.profileForm.get(['address', 'city']).setValue(dataObj.address && dataObj.address.city ? dataObj.address.city : '');
        this.profileForm.get(['address', 'zipCode']).setValue(dataObj.address && dataObj.address.zipCode ? dataObj.address.zipCode : '');
        this.profileForm.get(['address', 'street']).setValue(dataObj.address && dataObj.address.street ? dataObj.address.street : '');
        this.profileForm.get(['address', 'countryId']).setValue(dataObj.address && dataObj.address.countryId ? dataObj.address.countryId : '');
        this.profileForm.get(['address', 'stateId']).setValue(dataObj.address && dataObj.address.stateId ? dataObj.address.stateId : '');
        this.profileForm.get(['address', 'countryObj']).setValue(dataObj.address && dataObj.address.countryObj ? dataObj.address.countryObj : '');
        this.profileForm.get(['address', 'stateObj']).setValue(dataObj.address && dataObj.address.stateObj ? dataObj.address.stateObj : '');
        this.selectedCountry = dataObj.address && dataObj.address.countryObj ? [dataObj.address.countryObj] : this.defaultList;
        this.selectedState = dataObj.address && dataObj.address.stateObj ? [dataObj.address.stateObj] : this.defaultList;
        if (this.profileForm.get(['address', 'countryId']).value > 0) {
          let id = this.profileForm.get(['address', 'countryId']).value
          this.getStateList(id)
        }
      }
      this.prevData={...this.entity};
    })
  }
  get formControl() { return this.profileForm.controls }
  handleSubmit = () => {
    if (this.profileForm.invalid) {
      this.submitted = true;
      var errorDiv = document.getElementsByClassName("msgError");
      errorDiv[0].scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
      setTimeout(() => {
        window.scrollBy(0, -50);
      }, 500)
    } else {
      this.submitted = false;
      let postObj = {
        ...this.profileForm.value,
      }
      postObj.address.countryObj = postObj.address && postObj.address.countryObj ? postObj.address.countryObj[0] : this.defaultList[0];
      postObj.address.stateObj = postObj.address && postObj.address.stateObj ? postObj.address.stateObj[0] : this.defaultList[0];
      postObj.dateOfBirth = this.dateOfBirth.value;
      this._HttpService.httpCall(this.basicApi, 'PUT', postObj, null).subscribe(res => {
        if (res.result) {
          let msgArray = [
            {
              mgs: res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess').subscribe(res => {
            this.getProfileData(this.basicApi);
          });

        } else {
          let msgArray = [
            { mgs: 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      }, error => {
        let msgArray = [
          { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
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
    this.getProfileData(this.basicApi);
  }
  changeDate = (event) => {
    this.formControl.dateOfBirth.setValue(this.dateOfBirth.value)
    if (!this.isReferralID) {
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
}
