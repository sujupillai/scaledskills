import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as service from '../../_service';
import { MustMatch } from '../../_helpers/_validators/must-match.validator';
import { ApiPath } from '../../_helpers/_constants/api'
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  formElement: FormGroup;
  error = '';
  submitted: boolean = false;
  countryList = [];
  selectedCountry = [];



  constructor(private _FormBuilder: FormBuilder, private _HttpService: service.HttpService, private _SharedService: service.SharedService, private _Router: Router) { }
  ngOnInit() {
    this.createForm(() => {


    })
  }
  createForm = (callback: any): void => {
    this.formElement = this._FormBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      }
    )
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.formElement.controls }


  handleSubmitForm = () => {
    if (this.formElement.invalid) {
      this.submitted = true;
      return
    } else {
      this.submitted = false;
      let url = ApiPath.AccountForgotPassword
      let param = {
        email: this.formControl.email.value
      }
      prompt('param', JSON.stringify(param))
      this._HttpService.httpCall(url, 'GET', null, param).subscribe(res => {
        if (res && res.responseCode == 406) {
          let msgArray = [
            { mgs: res.responseMessege, class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Message')
        } else if (res && res.responseCode == 200) {
          let msgArray = [
            { mgs: res.responseMessege, class: 'confirmMsg' },
            { mgs: 'Please check your registered email id for rest password link.', class: 'subMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
            this._Router.navigate(['/']);
          })
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        }
      },
        error => {
          let msgArray = [
            { mgs: error['message'], class: 'confirmMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        })
    }
  }
}
