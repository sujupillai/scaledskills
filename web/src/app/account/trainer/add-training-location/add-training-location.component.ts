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
  trainingLocationForm: FormGroup;
  countryList = [];
  stateList = [];
  submitted: boolean = false;
  trainingId = 0;
  selectedCountry = [];
  selectedState = [];
  defaultList = [{
    "text": "Select",
    "value": "0",
    "isSelect": false
  }];
  prevState;
  settings
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  ngOnInit() {
    this._ActivatedRoute.parent.params.subscribe((param: any) => {
      this.trainingId = param['id'];
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
        this.getData()
      }
    });
    this.createForm(() => {
      this.settings = { singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items' };
      this.getCountryList();
    })
  }
  createForm = (callback) => {
    this.trainingLocationForm = this._FormBuilder.group({
      id: 0,
      modeType: [1, Validators.required],
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
  get formControl() { return this.trainingLocationForm.controls };
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
    this.trainingLocationForm.get(['addressModel', 'countryId']).setValue(event.value)
    this.getStateList(id)
  }
  onChangeState(event) {
    this.trainingLocationForm.get(['addressModel', 'stateId']).setValue(event.value)
  }
  getData = () => {
    let url = ApiPath.trainingLocation;
    url = url.replace('{TrainingId}', '1')
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.prevState = {
        ...res.result
      };
      let dataObj = res.result;
      Object.keys(dataObj).forEach(name => {
        if (this.formControl[name]) {
          if (name != 'addressModel') {
            this.formControl[name].setValue(dataObj[name]);
          }
        }
      });
      this.setAddress(dataObj)
    })

  }
  setAddress = (dataObj) => {
    this.trainingLocationForm.get(['addressModel', 'address1']).setValue(dataObj.addressModel && dataObj.addressModel.address1 ? dataObj.addressModel.address1 : 'NA');
    this.trainingLocationForm.get(['addressModel', 'address2']).setValue(dataObj.addressModel && dataObj.addressModel.address2 ? dataObj.addressModel.address2 : 'NA');
    this.trainingLocationForm.get(['addressModel', 'address3']).setValue(dataObj.addressModel && dataObj.addressModel.address3 ? dataObj.addressModel.address3 : 'NA');
    this.trainingLocationForm.get(['addressModel', 'city']).setValue(dataObj.addressModel && dataObj.addressModel.city ? dataObj.addressModel.city : 'NA');
    this.trainingLocationForm.get(['addressModel', 'zipCode']).setValue(dataObj.addressModel && dataObj.addressModel.zipCode ? dataObj.addressModel.zipCode : 'NA');
    this.trainingLocationForm.get(['addressModel', 'street']).setValue(dataObj.addressModel && dataObj.addressModel.street ? dataObj.addressModel.street : 'NA');
    this.trainingLocationForm.get(['addressModel', 'countryId']).setValue(dataObj.addressModel && dataObj.addressModel.countryId ? dataObj.addressModel.countryId : 'NA');
    this.trainingLocationForm.get(['addressModel', 'stateId']).setValue(dataObj.addressModel && dataObj.addressModel.stateId ? dataObj.addressModel.stateId : 'NA');
    this.trainingLocationForm.get(['addressModel', 'countryObj']).setValue(dataObj.addressModel && dataObj.addressModel.countryObj ? dataObj.addressModel.countryObj : 'NA');
    this.trainingLocationForm.get(['addressModel', 'stateObj']).setValue(dataObj.addressModel && dataObj.addressModel.stateObj ? dataObj.addressModel.stateObj : 'NA');
    this.selectedCountry = [dataObj.addressModel.countryObj ? dataObj.addressModel.countryObj : this.defaultList];
    this.selectedState = [dataObj.addressModel.stateObj ? dataObj.addressModel.stateObj : this.defaultList];
    if (this.trainingLocationForm.get(['addressModel', 'countryId']).value > 0) {
      let id = this.trainingLocationForm.get(['addressModel', 'countryId']).value
      this.getStateList(id)
    }
  }
  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    let dataObj = this.prevState;
    Object.keys(dataObj).forEach(name => {
      if (this.formControl[name]) {
        if (name != 'addressModel') {
          this.formControl[name].setValue(this.prevState[name]);
          control.setErrors(null);
        }
      }
    });
    this.setAddress(dataObj)
  }
  handleCancel = () => {
    let msgArray = [
      { mgs: 'Are you sure, you want to cancel ?', class: 'confirmMsg' },
      { mgs: 'Unsaved changes will not be saved.', class: 'subMsg' },
    ]
    // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
      if (res == 1) {
        this.resetForm(this.trainingLocationForm)
      }
    })
  }
  handleSubmit = () => {
    let url = ApiPath.trainingLocation;
    url = url.replace('{TrainingId}', '1')
    let postObj = {
      ...this.trainingLocationForm.value
    }
    postObj.addressModel.countryObj = postObj.addressModel.countryObj[0];
    postObj.addressModel.stateObj = postObj.addressModel.stateObj[0];
    if (this.trainingLocationForm.valid) {
      this.submitted = false;
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res.responseCode == 200) {
          let msgArray = [
            {
              mgs: res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess')
          this.getData()
        }
        else {
          let msgArray = [
            { mgs: 'Something went wrong', class: 'confirmMsg' }
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error');
          this.resetForm(this.trainingLocationForm)
        }
      },
        error => {
          let msgArray = [
            { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        });
      this.resetForm(this.trainingLocationForm)
    } else {
      let msgArray = [
        { mgs: 'Please complete form', class: 'confirmMsg' },
      ]
      // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
      this.submitted = true;
    }
  }
}
