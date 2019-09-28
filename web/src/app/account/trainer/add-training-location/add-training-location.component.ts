import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service'
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-training-location',
  templateUrl: './add-training-location.component.html',
})
export class AddTrainingLocationComponent implements OnInit {
  trainingLocationForm: FormGroup;
  countryList = [];
  stateList = [];
  submitted: boolean = false;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.createForm(() => {
      this.getCountryList();
    })
  }
  createForm = (callback) => {
    this.trainingLocationForm = this._FormBuilder.group({
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
    let id = event.value.value
    this.trainingLocationForm.get(['address', 'countryId']).setValue(event.value.value)
    this.getStateList(id)
  }
  onChangeState(event) {
    this.trainingLocationForm.get(['address', 'stateId']).setValue(event.value.value)
  }
  getData = () => {
    const url = ApiPath.trainingLocation;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      prompt('res', JSON.stringify(res))
    })
  }
  handleSubmit = () => {
    const url = ApiPath.trainingLocation;
    let postObj = {
      ...this.trainingLocationForm.value
    }
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
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        }
      },
        error => {
          let msgArray = [
            { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        });
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
