import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { SharedService, HttpService } from '../../../_service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-add-training-feedback',
  templateUrl: './add-training-feedback.component.html'
})
export class AddTrainingFeedbackComponent implements OnInit {
  traineeReviewForm: FormGroup;
  trainingId: any = 0;
  prevState
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
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
        this.getData()
      }
    });
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.traineeReviewForm = this._FormBuilder.group({
      rateOfSatisfied: [''],
      likeAbout: [''],
      improveAbout: [''],
      needInFeature: [''],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.traineeReviewForm.controls };
  getData = () => {
    let url = ApiPath.trainingReview;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        let resObj = res.result[0];
        this.prevState = res.result[0];
        if(resObj){
          Object.keys(resObj).forEach(name => {
            if (this.formControl[name]) {
              this.formControl[name].setValue(resObj[name]);
            }
          });
        }
      }
    })
  }
  handleSubmit = (): void => {
    let url = ApiPath.trainingReview;
    url = url.replace('{TrainingId}', this.trainingId.toString())
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
  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    let dataObj = this.prevState;
    if (dataObj) {
      Object.keys(dataObj).forEach(name => {
        if (this.formControl[name]) {
          if (name != 'addressModel') {
            this.formControl[name].setValue(this.prevState[name]);
            control.setErrors(null);
          }
        }
      });
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
        this.resetForm(this.traineeReviewForm)
      }
    })
  }
}
