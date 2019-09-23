import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service'
@Component({
  selector: 'app-add-training-settings',
  templateUrl: './add-training-settings.component.html'
})
export class AddTrainingSettingsComponent implements OnInit {
  trainingSettingForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder, private _SharedService: SharedService, private _HttpService: HttpService) { }
  optionArray = [];
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.trainingSettingForm = this._FormBuilder.group({
      trainingId: 0,
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
  get formControl() { return this.trainingSettingForm.controls };
  getData = () => {
    const url = ApiPath.trainingSettings;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      let resObj = res;
      Object.keys(resObj).forEach(name => {
        if (this.formControl[name]) {
          this.formControl[name].setValue(resObj[name]);
        }
      });
    })
  }
  handleSubmit = () => {
    const url = ApiPath.trainingSettings;
    let postObj = {
      ...this.trainingSettingForm.value
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
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess')
        this.getData()
      }
      else {
        let msgArray = [
          { mgs: res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
        ]
        // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
      }
    },
      error => {
        let msgArray = [
          { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
        ]
        // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
      });
  }
}
