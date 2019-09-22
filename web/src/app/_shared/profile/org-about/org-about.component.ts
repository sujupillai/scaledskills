import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service'
@Component({
  selector: 'app-org-about',
  templateUrl: './org-about.component.html'
})
export class OrgAboutComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService) { }
  aboutForm: FormGroup
  ngOnInit() {
    this.createForm(() => {
      this.getUserAboutData();
    })
  }
  createForm = (callback) => {
    this.aboutForm = this._FormBuilder.group(
      {
        aboutText: [''],
        coursesOfferedText: [''],
        name: [''],
      }
    )
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.aboutForm.controls };
  getUserAboutData = () => {
    const url = ApiPath.organizationUserTag;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.result) {
        let dataObj = res.result;
        Object.keys(dataObj).forEach(name => {
          if (this.formControl[name]) {
            this.formControl[name].setValue(dataObj[name]);
          }
        });
        this.formControl.name.setValue(dataObj && dataObj.name ? dataObj.name.split(",") : [])
      }
    })
  }
  handleSubmit = (): void => {
    const url = ApiPath.organizationUserTag;
    let postData = {
      ...this.aboutForm.value
    }
    postData.name = postData.name.toString();
    this._HttpService.httpCall(url, 'POST', postData, null).subscribe(res => {
      if (res.result) {
        let msgArray = [
          {
            mgs: res.responseMessege ? res.responseMessege : 'Success',
            class: 'confirmMsg'
          },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess');
        this.getUserAboutData()
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
    });
  }
}
