import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { SharedService, HttpService } from '../../../_service';
@Component({
  selector: 'app-add-training-basic',
  templateUrl: './add-training-basic.component.html',
})
export class AddTrainingBasicComponent implements OnInit {
  trainingBasicForm: FormGroup;
  baseUrl = 'http://scaledskills.com/t/';
  cities = [];
  trainingForList = []
  submitted: boolean = false;
  startDate = new FormControl();
  endDate = new FormControl();
  constructor(private _FormBuilder: FormBuilder, private _SharedService: SharedService, private _HttpService: HttpService) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.trainingForList = [
      { name: 'Individual', code: '1' },
      { name: 'Organization', code: '2' },
    ]
  }
  ngOnInit() {
    this.createForm(() => {
      this.startDate.setValue(new Date());
      this.endDate.setValue(new Date());
    })
  }
  createForm = (callback: any): void => {
    this.trainingBasicForm = this._FormBuilder.group({
      name: ['', Validators.required],
      baseUrl: ['http://scaledskills.com/o/', Validators.required],
      url: ['', Validators.required],
      trainingFor: ['', Validators.required],
      organization: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timeZone: ['', Validators.required],
      organizationList: [],
      hostedBy: ['']
    })
    if (callback) {
      callback()
    }
  }

  get formControl() { return this.trainingBasicForm.controls }
  getData = () => {
    let url = ApiPath.training;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => [
      prompt('res', JSON.stringify(res))
    ])
  }
  handleSubmit = () => {
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
            { mgs: res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
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
