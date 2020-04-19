import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { first } from 'rxjs/operators';
import { HttpService, SharedService } from '../../../_service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  formElement: FormGroup;
  trainingId: any = 0;
  prevState;
  feedbackObj = [];
  submitted = false;
  res
  val2: number = 5;
  msg = null;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _Router: Router) { }
  ngOnInit() {
    this.createprofileForm(() => {
      this.getData();
    })
  }
  createprofileForm = (callback) => {
    this.formElement = this._FormBuilder.group({
      rateOfSatisfied: ['', Validators.required],
      likeAbout: [''],
      improveAbout: [''],
      needInFeature: [''],
      id: 0
    })
    if (callback) {
      callback();
    }
  }
  get formControl() { return this.formElement.controls }
  getData = () => {
    let url = ApiPath.getTrainingReviewByUser;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.feedbackObj = res.result;
        Object.keys(this.feedbackObj).forEach(name => {
          if (this.formControl[name]) {
            this.formControl[name].setValue(this.feedbackObj[name]);
          }
        });
      }
    })
  }
  handleRate(event) {
    this.msg = null;
  }
  handleCancelRate(event) {
    this.msg = "Required Field.";
  }
  handleSubmit = (): void => {
    let url = ApiPath.trainingReview;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    let postObj = {
      ...this.formElement.value
    }
    if (this.formElement.valid) {
      this.submitted = false;
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        // if (res && res.responseCode == 200) {
        //   this.ref.close();
        // } else {
        //   let msgArray = [
        //     { mgs: 'Something went wrong', class: 'confirmMsg' }
        //   ]
        //   this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        // }
      }, error => {
        let msgArray = [
          { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      });
    } else {
      this.msg = "Required Field.";
      this.submitted = true;
    }
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
    // this.ref.close();
  }
}
