import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service'
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-training-location',
  templateUrl: './add-training-location.component.html',
})
export class AddTrainingLocationComponent implements OnInit {
  onlineLocationForm: FormGroup;
  physicalLocationForm: FormGroup;
  modeType = 0;
  trainingId = 0;
  entity;
  prevState;
  countryList = [];
  stateList = [];
  submitted: boolean = false;
  selectedCountry = [];
  selectedState = [];
  defaultList = [{
    "text": "Select",
    "value": "0",
    "isSelect": false
  }];
  settings
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  ngOnInit() {
    this._ActivatedRoute.parent.params.subscribe((param: any) => {
      this.trainingId = param.id;
      if (this.trainingId == 0) {
        let msgArray = [
          { mgs: 'Sorry! You have to create a training first', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, true, true, false, 'OKAY', 'CANCEL', false, 'Alert').subscribe(res => {
          if (res == 1) {
            this._Router.navigate(['account/trainer/training/0/basic']);
          }
        })
        return
      } else {
        this.createPhysicalForm(() => {
          this.settings = { singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items', enableSearchFilter: true,};
          this.getCountryList();
        })
        this.createOnlineForm(() => {
        })
        this.getData()
      }
    });
  }
  createOnlineForm = (callback) => {
    this.onlineLocationForm = this._FormBuilder.group({
      id: 0,
      onlineLocation: ['', Validators.required],
      locationDetail: [''],
      modeType: [2, Validators.required],
      addressModel: this._FormBuilder.group({
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
      }),
    })
    if (callback) {
      callback()
    }
  }
  get onlineFormControl() { return this.onlineLocationForm.controls };
  createPhysicalForm = (callback) => {
    this.physicalLocationForm = this._FormBuilder.group({
      id: 0,
      onlineLocation: [''],
      locationDetail: [''],
      modeType: [1],
      addressModel: this._FormBuilder.group({
        address1: ['', Validators.required],
        address2: [''],
        address3: [''],
        zipCode: ['', [Validators.required, Validators.minLength(6)]],
        street: [''],
        countryId: ['', Validators.required],
        countryObj: [],
        stateId: ['', Validators.required],
        stateObj: [''],
        city: ['', Validators.required],
      }),
    })
    if (callback) {
      callback()
    }
  }
  get physicalFormControl() { return this.physicalLocationForm.controls };

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
    this.physicalLocationForm.get(['addressModel', 'countryId']).setValue(event.value)
    this.getStateList(id)
  }
  OnCountryDeSelect(event) {
    this.physicalLocationForm.get(['addressModel', 'countryId']).setValue('')
    this.physicalLocationForm.get(['addressModel', 'stateId']).setValue('')
    this.physicalLocationForm.get(['addressModel', 'stateObj']).setValue('')
    this.physicalLocationForm.get(['addressModel', 'city']).setValue('');
    this.physicalLocationForm.get(['addressModel', 'zipCode']).setValue('');
    this.selectedState = this.defaultList;
    this.selectedState = this.defaultList;
    this.stateList = [];
  }
  onChangeState(event) {
    this.physicalLocationForm.get(['addressModel', 'stateId']).setValue(event.value)
  }
  OnStateDeSelect(event) {
    this.physicalLocationForm.get(['addressModel', 'stateId']).setValue('')
    this.physicalLocationForm.get(['addressModel', 'stateObj']).setValue('')
    this.physicalLocationForm.get(['addressModel', 'city']).setValue('');
    this.physicalLocationForm.get(['addressModel', 'zipCode']).setValue('');
    this.selectedState = this.defaultList;
  }
  setAddress = (dataObj, formElement) => {
    this[formElement].get(['addressModel', 'address1']).setValue(dataObj.addressModel && dataObj.addressModel.address1 ? dataObj.addressModel.address1 : 'NA');
    this[formElement].get(['addressModel', 'address2']).setValue(dataObj.addressModel && dataObj.addressModel.address2 ? dataObj.addressModel.address2 : 'NA');
    this[formElement].get(['addressModel', 'address3']).setValue(dataObj.addressModel && dataObj.addressModel.address3 ? dataObj.addressModel.address3 : 'NA');
    this[formElement].get(['addressModel', 'city']).setValue(dataObj.addressModel && dataObj.addressModel.city ? dataObj.addressModel.city : 'NA');
    this[formElement].get(['addressModel', 'zipCode']).setValue(dataObj.addressModel && dataObj.addressModel.zipCode ? dataObj.addressModel.zipCode : 'NA');
    this[formElement].get(['addressModel', 'street']).setValue(dataObj.addressModel && dataObj.addressModel.street ? dataObj.addressModel.street : 'NA');
    this[formElement].get(['addressModel', 'countryId']).setValue(dataObj.addressModel && dataObj.addressModel.countryId ? dataObj.addressModel.countryId : 0);
    this[formElement].get(['addressModel', 'stateId']).setValue(dataObj.addressModel && dataObj.addressModel.stateId ? dataObj.addressModel.stateId : 0);
    this[formElement].get(['addressModel', 'countryObj']).setValue(dataObj.addressModel && dataObj.addressModel.countryObj ? dataObj.addressModel.countryObj : 'NA');
    this[formElement].get(['addressModel', 'stateObj']).setValue(dataObj.addressModel && dataObj.addressModel.stateObj ? dataObj.addressModel.stateObj : 'NA');
    this.selectedCountry = dataObj.addressModel && dataObj.addressModel.countryObj ? [dataObj.addressModel.countryObj] : this.defaultList;
    this.selectedState = dataObj.addressModel && dataObj.addressModel.stateObj ? [dataObj.addressModel.stateObj] : this.defaultList;
    if (this[formElement].get(['addressModel', 'countryId']).value > 0) {
      let id = this[formElement].get(['addressModel', 'countryId']).value
      this.getStateList(id)
    }
  }
  fillFormData = (formControl, formElement) => {
    Object.keys(this.entity).forEach(name => {
      if (this[formControl][name]) {
        if (name != 'addressModel') {
          this[formControl][name].setValue(this.entity[name]);
        }
      }
    });
    if (this.modeType == 1) {
      this.setAddress(this.entity, formElement)
    }
  }
  getData = () => {
    let url = ApiPath.trainingLocation;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.entity = res.result;
      this.prevState = {
        ...res.result
      };
      this.modeType = this.entity.modeType;
      if (this.modeType == 2) {
        this.fillFormData('onlineFormControl', 'onlineLocationForm');
      } else if (this.entity.modeType == 1) {
        this.fillFormData('physicalFormControl', 'physicalLocationForm');
      }
    })
  }
  submitHttpReq = (postObj, formCtrl, formElement) => {
    let url = ApiPath.trainingLocation;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.resetForm(this[formElement], formCtrl)
      this.getData();
      
    })
  }
  handleSubmit = () => {
    if (this.modeType == 2) {
      if (this.onlineLocationForm.valid) {
        let postObj = { ...this.onlineLocationForm.value }
        this.submitHttpReq(postObj, 'onlineFormControl', 'onlineLocationForm')
      }
    } else if (this.modeType == 1) {
      let postObj = {
        ...this.physicalLocationForm.value
      }
      postObj.addressModel.countryObj = postObj.addressModel.countryObj[0];
      postObj.addressModel.stateObj = postObj.addressModel.stateObj[0];
      if (this.physicalLocationForm.valid) {
        this.submitHttpReq(postObj, 'physicalFormControl', 'physicalLocationForm')
      }
    }
  }
  resetForm(formGroup: FormGroup, formCtrl) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    let dataObj = this.prevState;
    Object.keys(dataObj).forEach(name => {
      if (this[formCtrl][name]) {
        if (name != 'addressModel') {
          this[formCtrl][name].setValue(this.prevState[name]);
        }
      }
    });
    //this.setAddress(this.entity, )
    if (this.prevState.modeType == 1) {
      this.setAddress(dataObj, formGroup)
    }
  }
  handleCancel = () => {
    let msgArray = [
      { mgs: 'Are you sure, you want to cancel ?', class: 'confirmMsg' },
      { mgs: 'Unsaved changes will not be saved.', class: 'subMsg' },
    ]
    // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
      if (res == 1) {
        let formElement
        let formCtrl
        if (this.modeType == 2) {
          formElement = 'onlineLocationForm';
          formCtrl = 'onlineFormControl';
        } else if (this.modeType == 1) {
          formElement = 'physicalLocationForm';
          formCtrl = 'physicalFormControl';
        }
        this.resetForm(this[formElement], formCtrl)
      }
    })
  }
}
