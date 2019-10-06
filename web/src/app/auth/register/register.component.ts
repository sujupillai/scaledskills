import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as service from '../../_service';
import { MustMatch } from '../../_helpers/_validators/must-match.validator';
import { ApiPath } from '../../_helpers/_constants/api'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';
  submitted: boolean = false;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: service.HttpService, private _SharedService: service.SharedService, private _Router: Router) { }
  ngOnInit() {
    this.createForm(() => {
    })
  }
  createForm = (callback: any): void => {
    this.registerForm = this._FormBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        userName: '',
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
        id: 0
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
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
      let url = ApiPath.register;
      let postObj = {
        ...this.registerForm.value
      };
      let params={
        auth:false
      }
      this._HttpService.httpCall(url, 'POST', postObj, params).subscribe(res => {
        if (res) {
          let msgArray = [
            { mgs: 'Account created successfully', class: 'confirmMsg' },
            { mgs: 'Do you want to login now?', class: 'subMsg' },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
            if (res == 1) {
              this._Router.navigate(['/auth/login']);
            } else {
              this._Router.navigate(['/']);
            }
          })
        } else {
          let msgArray = [
            { mgs: 'Something went wrong', class: 'confirmMsg' },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        }
      },
        error => {
          let msgArray = [
            { mgs: error['error'], class: 'confirmMsg' },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        });
    }
  }
}
