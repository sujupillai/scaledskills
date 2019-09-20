import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api'
import { HttpService } from '../../../_service/http.service'
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
})
export class SocialComponent implements OnInit {
  socialForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService) { }
  ngOnInit() {
    this.createForm(() => {
      this.getSocialData();
    })
  }
  createForm = (callback) => {
    this.socialForm = this._FormBuilder.group({
      'websiteUrls': '',
      'linkedInUrls': '',
      'facebookUrls': '',
      'twitterUrls': '',
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.socialForm.controls };
  getSocialData = () => {
    const url = ApiPath.userSocial;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.result) {
        let dataObj = res.result[0];
        Object.keys(dataObj).forEach(name => {
          if (this.formControl[name]) {
            this.formControl[name].setValue(dataObj[name]);
          }
        });
      }
    })
  }
  handleSubmit = () => {
    let postObj = {
      ...this.socialForm.value
    }
    const url = ApiPath.userSocial;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res.result) {
        this.getSocialData()
      }
    })
  }
}
