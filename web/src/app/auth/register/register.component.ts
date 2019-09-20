import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as service from '../../_service';
import { first } from 'rxjs/operators';
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
  constructor(private _FormBuilder: FormBuilder, private _HttpService: service.HttpService, private _SharedService: service.SharedService, ) { }
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
        phoneNumber: ['', Validators.required],
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
      this.openAlertDialog('')
      return
    } else {
      let url = ApiPath.register;
      let postObj = {
        ...this.registerForm.value
      };
      let params = {
        isAuth: 'false',
      }
      this._HttpService.httpCall(url, 'POST', postObj, params).subscribe(res => {
        if (res) {
          this.openAlertDialog('Account created success')
        } else {
          this.openAlertDialog('Something went wrong')
        }
      },
        error => {
          this.error = error;
          this.openAlertDialog('Something went wrong')
        });
    }
  }
  openAlertDialog = (mesage) => {
    let dialogConfig = {
      message: mesage,
      isAction: false,
      isYes: false,
      isNo: false,
      yesText: 'Yes',
      noText: 'Cancel',
      autoClose: true
    };
    let dialogHeader = "Alert!!!";
    let dialogWidth: '50'
    const ref = this._SharedService.openDialog(dialogConfig, dialogHeader, dialogWidth);
    ref.onClose.subscribe((res) => {
      if (res) {
      }
    });
  }
}
