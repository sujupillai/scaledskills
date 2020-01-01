import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api'
import { HttpService, SharedService } from '../../../_service'
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
})
export class SocialComponent implements OnInit {
  formElement: FormGroup;
  prevState;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService) { }
  ngOnInit() {
    this.createForm(() => {
      this.getData();
    })
  }
  createForm = (callback) => {
    this.formElement = this._FormBuilder.group({
      websiteUrls: '',
      linkedInUrls: '',
      facebookUrls: '',
      twitterUrls: '',
      id: 0
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.formElement.controls };
  getData = () => {
    const url = ApiPath.userSocial;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        if (res.result) {
          this.prevState = {
            ...res.result
          };
          let dataObj = res.result;
          Object.keys(dataObj).forEach(name => {
            if (this.formControl[name]) {
              this.formControl[name].setValue(dataObj[name]);
            }
          });
        }
      } else {
        let msgArray = [
          { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      }
    },
      error => {
        let msgArray = [
          { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      });
  }
  handleSubmit = () => {
    let postObj = {
      ...this.formElement.value
    }
    const url = ApiPath.userSocial;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        let msgArray = [
          {
            mgs: res && res.responseMessege ? res.responseMessege : 'Success',
            class: 'confirmMsg'
          },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess').subscribe(res=>{
          this.resetForm(this.formElement)
        this.getData();
        });
        
      } else {
        let msgArray = [
          { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      }
    },
      error => {
        let msgArray = [
          { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      });
  }
  resetForm(formGroup: FormGroup) {
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(this.prevState).forEach(name => {
      if (this.formControl[name]) {
        this.formControl[name].setValue(this.prevState[name])
      }
    });
  }
  handleCancel = () => {
    let msgArray = [
      { mgs: 'Are you sure, you want to cancel ?', class: 'confirmMsg' },
      { mgs: 'Unsaved changes will not be saved.', class: 'subMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
      if (res == 1) {
        this.resetForm(this.formElement)
      }
    })
  }
}
