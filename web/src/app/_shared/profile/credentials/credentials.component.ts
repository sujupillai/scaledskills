import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService, SharedService } from '../../../_service';
import { MustMatch } from '../../../_helpers/_validators/must-match.validator';
import { ApiPath } from '../../../_helpers/_constants/api'
@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html'
})
export class CredentialsComponent implements OnInit {
  credentialForm: FormGroup;
  submitted = false;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService) { }
  ngOnInit() {
    this.createForm(() => {
    })
  }
  createForm = (callback: any): void => {
    this.credentialForm = this._FormBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword'),
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.credentialForm.controls; }
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
    let dialogHeader = "Alert!!";
    let dialogWidth: '50'
    const ref = this._SharedService.openDialog(dialogConfig, dialogHeader, dialogWidth);
    ref.onClose.subscribe((res) => {
      if (res) {
      }
    });
  }
  handleSubmit = () => {
    const url = ApiPath.changePassword;
    let postObj = {
      ...this.credentialForm.value
    }
    if (this.credentialForm.valid) {
      this.submitted = false;
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res.responseCode == 200) {
          this.openAlertDialog(res.responseMessege ? res.responseMessege : 'Something went wrong')
        }
      },
        error => {
          this.openAlertDialog(error['error'] ? error['error'] : 'Something went wrong')
        });
    } else {
      this.submitted = true;
    }
  }
}
