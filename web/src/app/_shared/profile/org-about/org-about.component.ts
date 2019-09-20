import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService } from '../../../_service/http.service'
@Component({
  selector: 'app-org-about',
  templateUrl: './org-about.component.html'
})
export class OrgAboutComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService) { }
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
      }
    })
  }
  handleSubmit = (): void => {
    const url = ApiPath.organizationUserTag;
    let postData = {
      ...this.aboutForm.value
    }
    this._HttpService.httpCall(url, 'POST', postData, null).subscribe(res => {
      if (res.result) {
        this.getUserAboutData()
      }
    })
  }
}
