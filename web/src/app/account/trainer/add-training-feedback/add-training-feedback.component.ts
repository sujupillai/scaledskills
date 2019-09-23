import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { SharedService, HttpService } from '../../../_service'
@Component({
  selector: 'app-add-training-feedback',
  templateUrl: './add-training-feedback.component.html'
})
export class AddTrainingFeedbackComponent implements OnInit {
  traineeReviewForm: FormGroup
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService) { }
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.traineeReviewForm = this._FormBuilder.group({
      rating: [''],
      likeText: [''],
      improveText: [''],
      featureText: [''],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.traineeReviewForm.controls };
  getData = () => {
    let url = ApiPath.changePassword;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      let resObj = res;
      Object.keys(resObj).forEach(name => {
        if (this.formControl[name]) {
          this.formControl[name].setValue(resObj[name]);
        }
      });
    })
  }
  handleSubmit = (): void => {
    let url = ApiPath.changePassword;
    let postObj = {
      ...this.traineeReviewForm.value
    }
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
    });
  }

}
