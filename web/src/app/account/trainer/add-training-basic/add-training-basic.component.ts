import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { SharedService, HttpService } from '../../../_service';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-add-training-basic',
  templateUrl: './add-training-basic.component.html',
})
export class AddTrainingBasicComponent implements OnInit {
  trainingBasicForm: FormGroup;
  cities = [];
  trainingForList = []
  trainingForValue = [];
  submitted: boolean = false;
  startDate = new FormControl();
  endDate = new FormControl();
  settings = {};
  trainingId = 0
  trainingData=null;
  constructor(private _FormBuilder: FormBuilder, private _SharedService: SharedService, private _HttpService: HttpService, private _ActivatedRoute: ActivatedRoute) {
    this.trainingForList = [
      { text: 'Individual', value: '1' },
      { text: 'Organization', value: '2' },
    ]
  }
  ngOnInit() {
    this._ActivatedRoute.parent.params.subscribe(
      (param: any) => {
        this.trainingId = param['id'];
        if (this.trainingId > 0) {
          this.getData()
        }
      });
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
      baseUrl: ['http://scaledskills.com/t/'],
      url: ['', Validators.required],
      trainingFor: [''],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timeZone: 0,
      organizationList: [],
      hostedBy: [0, Validators.required],
      hostedByObj: [],
      id:0
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.trainingBasicForm.controls }
  getData = () => {
    let url = '1';
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.trainingData=res.result;
      Object.keys(this.trainingData).forEach(name => {
        if (this.formControl[name]) {
          this.formControl[name].setValue(this.trainingData[name]);
        }
      });
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
    debugger
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
      // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
    } else {
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
  }
}
