import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as service from '../../_service';
import { MustMatch } from '../../_helpers/_validators/must-match.validator';
import { ApiPath } from '../../_helpers/_constants/api'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
})
export class SetpasswordComponent implements OnInit {
  registerForm: FormGroup;
  error = '';
  submitted: boolean = false;

  constructor(private _FormBuilder: FormBuilder, private _HttpService: service.HttpService,
    private _SharedService: service.SharedService, private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.createForm(() => {
      this._ActivatedRoute.queryParams.subscribe(queryParams => {
        let paramObj = queryParams;
        this.formControl.code.setValue(queryParams.code)
        this.formControl.userId.setValue(queryParams.usr)
        this.formControl.usr.setValue(queryParams.usr)
      })
    })
  }
  createForm = (callback: any): void => {
    this.registerForm = this._FormBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        code: "",
        userId: "",
        usr: ''
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword'),
      }
    )
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.registerForm.controls }


  handleSubmitForm = () => {
    if (this.registerForm.invalid) {
      this.submitted = true;
      return
    } else {
      this.submitted = false;
      let url = ApiPath.AccountForgotPassword;
      let postObj = this.registerForm.value;
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res && res.responseCode == 406) {
          let msgArray = [
            { mgs: res.responseMessege, class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Message')
        } else if (res && res.responseCode == 200) {
          let msgArray = [
            { mgs: res.responseMessege, class: 'confirmMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess').subscribe(res => {
            this._Router.navigate(['/auth/login']);
          })
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' },
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
  }
}

