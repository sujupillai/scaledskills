import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-training-settings',
  templateUrl: './add-training-settings.component.html'
})
export class AddTrainingSettingsComponent implements OnInit {
  form: FormGroup;
  trainingId: any = 0;
  prevState
  constructor(private _FormBuilder: FormBuilder, private _SharedService: SharedService, private _HttpService: HttpService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  optionArray = [];
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
    this.form = this._FormBuilder.group({
      trainingId: this.trainingId,
      id: 0,
      isPublicRepeat: false,
      isPublicCustomQuestion: false,
      isPublicRemainingTicket: false,
      isPublicSetReminder: false,
      isPublicAffiliatePromoterLink: false,
      isPublicTrainingId: false,
      isPublicPageViews: false,
      isPublicInterestedUser: false,
      isPublicRegisteredUser: false,
      isPublicAddToCalendar: false,
      isPublicXSpotsLeft: false,
      isPublicComments: false,
      isPublicFeedback: false,
      isPublicAboutOrganizer: false,
      isPublicMoreEventsFromSameOrganizer: false,
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.form.controls };
  getData = () => {
    let url = ApiPath.trainingSettings;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.prevState = {
        ...res.result
      };
      let resObj = res.result;
      Object.keys(resObj).forEach(name => {
        if (this.formControl[name]) {
          this.formControl[name].setValue(resObj[name]);
        }
      });
    })
  }
  handleSubmit = () => {
    let url = ApiPath.trainingSettings;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    let postObj = {
      ...this.form.value
    }
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res.responseCode == 200) {
        let msgArray = [
          {
            mgs: res.responseMessege ? res.responseMessege : 'Success',
            class: 'confirmMsg'
          },
        ]
        // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess').subscribe(res=>{
          this.getData()
        })
      }
      else {
        let msgArray = [
          { mgs: 'Something went wrong', class: 'confirmMsg' }
        ]
        // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      }
    },
      error => {
        let msgArray = [
          { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
        ]
        // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      });
  }
  resetForm(formGroup: FormGroup) {
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(this.prevState).forEach(name => {
      if (this.formControl[name]) {
        this.formControl[name].setValue(this.prevState[name]);
      }
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
        this.resetForm(this.form)
      }
    })
  }
}
