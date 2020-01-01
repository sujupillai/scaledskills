import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../_helpers/_constants/api';
import { first } from 'rxjs/operators';
import { HttpService, SharedService } from '../../_service';
@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
})
export class TrainingFormComponent implements OnInit {
  requestForm: FormGroup;
  items: any[];
  @ViewChild('menuItems', { static: false }) menu: any[];
  activeItem: any;
  submitted: boolean = false;
  countryList = [];
  stateList = [];
  trainingNeedDDL = [];
  trainingTypeDDL = [];
  globalDropdown: [];

  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService) {
  }
  ngOnInit() {
    this.createForm(() => {
      this.items = [
        { label: 'My Requests', index: 0 },
        { label: 'My Response', index: 1 }
      ];
      this.activeItem = this.items[1];

      this.getCountryList();
      this.getGlobalMaster();
    })
  }
  createForm = (callback) => {
    this.requestForm = this._FormBuilder.group({
      needType: ['', Validators.required],
      needTypeObj: [''],
      trainingType: ['', Validators.required],
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
    if (this.requestForm.invalid) {
      let msgArray = [
        { mgs: 'Please complete form', class: 'confirmMsg' },
      ]
      // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      this.submitted = true;
      return
    } else {
      const url = ApiPath.trainingRequest;
      let postObj = {
        ...this.requestForm.value
      }
      postObj.keywords = postObj.keywords.toString();
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res.result) {
          // this.getTrainingData();
          let msgArray = [
            { mgs: 'Request Send', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess')
        } else {
          let msgArray = [
            { mgs: 'Something went wrong', class: 'confirmMsg' },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      },
        error => {
          let msgArray = [
            { mgs: error['message']?error['message']:'Server Error', class: 'confirmMsg' },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        });
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
  }
  handleCancel = () => {
    let msgArray = [
      { mgs: 'Are you sure, you want to cancel ?', class: 'confirmMsg' },
      { mgs: 'Unsaved changes will not be saved.', class: 'subMsg' },
    ]
    // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
      if (res == 1) {
        this.resetForm(this.requestForm)
      }
    })
  }
  activateMenu(item) {
    this.activeItem = this.menu['activeItem'];

  }
}

