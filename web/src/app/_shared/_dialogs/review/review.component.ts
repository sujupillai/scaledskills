import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { SharedService, HttpService } from '../../../_service';
import { ActivatedRoute, Router } from '@angular/router'
import { DynamicDialogRef } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/api';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {
  traineeReviewForm: FormGroup;
  trainingId: any = 0;
  prevState;
  listData = [];
  submitted = false;
  res
  val2: number = 5;
  msg = null;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  ngOnInit() {
    this.res = this.config.data;
    this.trainingId = this.res.data.trainingId;
    this.createForm(() => {
      this.getData()
    })
  }
  createForm = (callback) => {
    this.traineeReviewForm = this._FormBuilder.group({
      rateOfSatisfied: ['', Validators.required],
      likeAbout: [''],
      improveAbout: [''],
      needInFeature: [''],
      id: 0
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
        this.listData = res.result;
        Object.keys(this.listData[0]).forEach(name => {
          if (this.formControl[name]) {
            this.formControl[name].setValue(this.listData[0][name]);
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
      ...this.traineeReviewForm.value
    }
    if (this.traineeReviewForm.valid) {
      this.submitted = false;
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          this.ref.close();
        } else {
          let msgArray = [
            { mgs: 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
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
    this.ref.close();
  }
}
