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
  baseUrl: string = window.location.origin + '/t/'
  trainingForList = []
  trainingForValue = [];
  organizationListValue = [];
  submitted: boolean = false;
  startDate = new FormControl();
  endDate = new FormControl();
  settings = {};
  trainingId = 0;
  zoneList = [];
  selectedZone = [];
  trainingData = null;
  urlConfig = {
    isUrl: false,
    isUrlValid: false,
    vrlValidationMsg: '',
    urlSubmitted: false
  }
  defaultList = [{
    "text": "Select",
    "value": "0",
    "isSelect": false
  }]
  constructor(private _FormBuilder: FormBuilder, private _SharedService: SharedService, private _HttpService: HttpService, private _ActivatedRoute: ActivatedRoute) {
    this.trainingForList = [
      { text: 'Individual', value: '1' },
      { text: 'Organization', value: '2' },
    ]
  }
  ngOnInit() {
    // this.getAllData();
    this.getTimeZone();
    this.createForm(() => {
      this.startDate.setValue(new Date());
      this.endDate.setValue(new Date());
      this.settings = { singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items' };
      this.trainingForValue = [{ text: 'Individual', value: '1' }]
      this._ActivatedRoute.parent.params.subscribe((param: any) => {
        this.trainingId = param['id'];
        if (this.trainingId > 0) {
          this.getData(this.trainingId)
        } else {
          this.resetForm(this.trainingBasicForm)
          this.trainingData = {};
        }
        
      });
    })
  }
  createForm = (callback: any): void => {
    this.trainingBasicForm = this._FormBuilder.group({
      name: ['', Validators.required],
      baseUrl: [window.location.origin + '/t/'],
      url: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timeZone: ['', Validators.required],
      timeZoneObj: [],
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
  getData = (id) => {
    let url =ApiPath.getTraining
    url = url.replace('{id}', id)
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.result) {
        this.trainingData = res.result;
        Object.keys(this.trainingData).forEach(name => {
          if (this.formControl[name]) {
            this.formControl[name].setValue(this.trainingData[name]);
          }
        });
        if (this.trainingData.url) {
          this.urlConfig.isUrl = true;
          this.urlConfig.isUrlValid = true;
        } else {
          this.urlConfig.isUrl = false;
        }
        setTimeout(() => {
          var hostedBy = this.trainingForList.filter(x => x.value == this.trainingData.hostedBy)
          this.formControl['hostedByObj'].setValue(hostedBy);
          var zone = this.zoneList.filter(x => x.value == this.trainingData.timeZone)
          this.formControl['timeZoneObj'].setValue(zone);
          this.selectedZone = zone;
        }, 200)
      } else {
        this.resetForm(this.trainingBasicForm)
      }
    })
  }
  getTimeZone = () => {
    let url = ApiPath.globalZone;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.zoneList = res.result;
      }
    })
  }
  updateUrl = () => {
    this.urlConfig.isUrlValid = false;
    this.urlConfig.vrlValidationMsg = 'Please validate url';
    this.urlConfig.urlSubmitted = false;
    let urlStr = (this.formControl['url'].value).split(' ').join('_')
    this.formControl['url'].setValue(urlStr)
  }
  viewProfile() {
    let val = window.location.origin + '/t/' + this.formControl['url'].value;
    window.open(val, "_blank");
  }
  validateUrl = () => {
    this.urlConfig.vrlValidationMsg = '';
    this.urlConfig.urlSubmitted = true;
    const url = ApiPath.trainingVU;
    let params = {
      url: this.formControl['url'].value
    }
    this._HttpService.httpCall(url, 'GET', null, params).subscribe(res => {
      if (res.responseCode == 200 && res.result) {
        this.urlConfig.isUrlValid = true;
      } else {
        this.urlConfig.isUrlValid = false
      }
      this.urlConfig.vrlValidationMsg = this.urlConfig.isUrlValid ? 'Url is available.' : 'Url is already used with other.';
    })
  }
  onChangeHostedBy(event) {
    let id = event.value
    if (id == 2) {
      /* display organization */
    }
    this.trainingBasicForm.get('hostedBy').setValue(event.value)
  }
  OnDeSelect(event) {
    this.formControl.hostedBy.setValue('');
    this.formControl.hostedByObj.setValue('');
    this.trainingForValue = this.defaultList;
  }
  handleSubmit = () => {
    this.formControl.startDate.setValue(this.startDate.value ? this.startDate.value : '');
    this.formControl.endDate.setValue(this.endDate.value ? this.endDate.value : '');
    let postObj = {
      ...this.trainingBasicForm.value,
    }
    if (this.trainingBasicForm.invalid) {
      this.submitted = true;
    } else {
      if (this.urlConfig.isUrlValid) {
        this.submitted = false;
        let url = ApiPath.training;
        this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
          if (res && res.responseCode == 406) {
            let msgArray = [
              { mgs: res.responseMessege, class: 'confirmMsg' }
            ]
            this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Message')
          }else if (res && res.responseCode == 200) {
            let msgArray = [
              {
                mgs: res.responseMessege ? res.responseMessege : 'Success',
                class: 'confirmMsg'
              },
            ]
            this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess').subscribe(res=>{
              this.trainingId=res['result'];
            this.getData(this.trainingId)
            });
          } else {
            let msgArray = [
              { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' },
            ]
            this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
          }
        }, error => {
          let msgArray = [
            { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
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
    this.getData(this.trainingId)
  }
  handleCancel = () => {
    let msgArray = [
      { mgs: 'Are you sure, you want to cancel ?', class: 'confirmMsg' },
      { mgs: 'Unsaved changes will not be saved.', class: 'subMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Alert!!').subscribe(res => {
      if (res == 1) {
        this.resetForm(this.trainingBasicForm)
      }
    })
  }
  OnZoneSelect(event) {
    let id = event.value
    this.formControl.timeZone.setValue(id)

  }
  OnZoneDeSelect(event) {
    this.formControl.timeZone.setValue('')
    this.formControl.timeZoneObj.setValue('')
  }
}
