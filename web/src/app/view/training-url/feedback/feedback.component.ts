import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { first } from 'rxjs/operators';
import { HttpService, SharedService, AuthenticationService } from '../../../_service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  formElement: FormGroup;
  refCode;
  trainingId: any = 0;
  prevState;
  feedbackObj = [];
  submitted = false;
  urlString: string = '';
  res
  val2: number = 5;
  msg = null;
  userInfo: any = {};
  entity = null;
  isLoggedIn: boolean = false;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _AuthenticationService: AuthenticationService, ) { }
  ngOnInit() {
    let url = ApiPath.trainingUrl;
    this.refCode = null;
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.refCode = params.refCode
    });
    let returnUrl = window.location.pathname;
    localStorage.setItem('returnurl', returnUrl);
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.urlString = param.url;
      url = url.replace('{urlName}', this.urlString)
      this.getUserInfo()
      this.getTrainingData(url)
    });
    this.createprofileForm(() => {
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
  getUserInfo = () => {
    this.userInfo = this._AuthenticationService.currentUserValue;
    this.isLoggedIn = this.userInfo ? true : false;
  }
  getTrainingData = (url) => {
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.entity = res.result;
        this.trainingId = res.result['trainingId'];
        if (this.entity.isRegister) {
          this.getFeedbackData(this.trainingId);
        } else {
          let msgArray = [
            { mgs: 'You should register first to give feedback', class: 'confirmMsg' },
            { mgs: 'Do you want to continue ?', class: 'subMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Information').subscribe(res => {
            if (res) {
              this._Router.navigate(['/t/' + this.entity.url + '/' + this.trainingId + '/booking'], { queryParams: { refCode: this.refCode } })
            } else {
              this._Router.navigate(['/t/' + this.entity.url], { queryParams: { refCode: this.refCode } })
            }
          })
        }
      }
    })
  }
  getFeedbackData = (trainingId) => {
    let url = ApiPath.getTrainingReviewByUser;
    url = url.replace('{TrainingId}', trainingId.toString())
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
        let msgArray = [
          { mgs: res.responseMessege ? res.responseMessege : 'Success', class: 'confirmMsg' }
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Success').subscribe(res => {
          this._Router.navigate(['/t/' + this.entity.url], { queryParams: { refCode: this.refCode } })
        });
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
    this._Router.navigate(['/t/' + this.entity.url], { queryParams: { refCode: this.refCode } })
  }
}
