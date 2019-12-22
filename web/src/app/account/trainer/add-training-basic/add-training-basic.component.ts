import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { SharedService, HttpService } from '../../../_service';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-add-training-basic',
  templateUrl: './add-training-basic.component.html',
})
export class AddTrainingBasicComponent implements OnInit {
  trainingBasicForm: FormGroup;
  isCopied = false;
  organizationListMaster = [];
  baseUrl: string = ''
  trainingForList = []
  trainingForValue = [];
  organizationListValue = [];
  submitted: boolean = false;
  startDate = new FormControl();
  endDate = new FormControl();
  settings = {};
  trainingId = 0;
  isUrl = false;
  isValidateUrl = false;
  urlValidationMsg = '';
  trainingData = null;
  constructor(private _FormBuilder: FormBuilder, private _SharedService: SharedService, private _HttpService: HttpService, private _ActivatedRoute: ActivatedRoute) {
    this.trainingForList = [
      { text: 'Individual', value: '1' },
      { text: 'Organization', value: '2' },
    ]
  }
  ngOnInit() {
    this.baseUrl = window.location.origin + 't/';
    this._ActivatedRoute.parent.params.subscribe((param: any) => {
      this.trainingId = param['id'];
      if (this.trainingId > 0) {
        this.getData()
      } else {

        this.resetForm(this.trainingBasicForm)
        this.trainingData = {};
      }
    });
    // this.getAllData();
    this.createForm(() => {
      this.startDate.setValue(new Date());
      this.endDate.setValue(new Date());
      this.settings = { singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items' };
      this.trainingForValue = [{ text: 'Individual', value: '1' }]
    })
  }
  createForm = (callback: any): void => {
    this.trainingBasicForm = this._FormBuilder.group({
      name: ['', Validators.required],
      baseUrl: [this.baseUrl],
      url: ['', Validators.required],
      trainingFor: [''],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timeZone: 0,
      organizationList: [],
      organizationListObj: [],
      hostedBy: [0, Validators.required],
      hostedByObj: [],
      id: 0
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.trainingBasicForm.controls }
  getData = () => {
    let url = this.trainingId.toString();
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.result) {
        this.trainingData = res.result;
        Object.keys(this.trainingData).forEach(name => {
          if (this.formControl[name]) {
            this.formControl[name].setValue(this.trainingData[name]);
          }
        });
        var hostedBy = this.trainingForList.filter(x => x.value == this.trainingData.hostedBy)
        this.formControl['hostedByObj'].setValue(hostedBy);
        if (this.trainingData.url) {
          this.isUrl = true;
          this.isValidateUrl = true;
        } else {
          this.isUrl = false;
          this.isValidateUrl = false;
        }
      } else {
        this.resetForm(this.trainingBasicForm)
      }
    })
  }
  updateUrl = () => {
    this.urlValidationMsg = '';
    let urlStr = (this.formControl['url'].value).split(' ').join('_')
    this.formControl['url'].setValue(urlStr)
  }
  viewProfile() {
    let val = window.location.origin + '/#/view/t/' + this.formControl['url'].value;
    window.open(val, "_blank");
  }
  validateUrl = () => {
    const url = ApiPath.trainingVU;
    let params = {
      url: this.formControl['url'].value
    }
    this._HttpService.httpCall(url, 'GET', null, params).subscribe(res => {
      if (res.responseCode == 200 && res.result) {
        this.isValidateUrl = true;
      } else {
        this.isValidateUrl = false
      }
      this.urlValidationMsg = this.isValidateUrl ? 'Url is available.' : 'Url is already used with other.';
    })
  }
  onChangeHostedBy(event) {
    let id = event.value
    if (id == 2) {
      /* display organization */
    }
    this.trainingBasicForm.get('hostedBy').setValue(event.value)
  }
  handleSubmit = () => {
    this.formControl.startDate.setValue(this.startDate.value ? this.startDate.value : '');
    this.formControl.endDate.setValue(this.endDate.value ? this.endDate.value : '');
    let postObj = {
      ...this.trainingBasicForm.value,
    }
    if (this.trainingBasicForm.invalid) {
      this.submitted = true;
      let msgArray = [
        { mgs: 'Please complete form', class: 'confirmMsg' },
      ]
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
    } else {
      if (this.isValidateUrl) {
        this.submitted = false;
        let url = ApiPath.training;
        this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
          if (res.result) {
            let msgArray = [
              {
                mgs: res.responseMessege ? res.responseMessege : 'Success',
                class: 'confirmMsg'
              },
            ]
            this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess');
            this.getData()
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
      else{
        this.urlValidationMsg = 'Please Validate url';
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
    this.getData()
  }
  handleCancel = () => {
    let msgArray = [
      { mgs: 'Are you sure, you want to cancel ?', class: 'confirmMsg' },
      { mgs: 'Unsaved changes will not be saved.', class: 'subMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
      if (res == 1) {
        this.resetForm(this.trainingBasicForm)
      }
    })
  }
}
