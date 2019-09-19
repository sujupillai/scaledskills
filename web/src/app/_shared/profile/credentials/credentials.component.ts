import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../_service/http.service';
import { MustMatch } from '../../../_helpers/_validators/must-match.validator';
import { ApiPath } from '../../../_helpers/_constants/api'
@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html'
})
export class CredentialsComponent implements OnInit {
  credentialForm: FormGroup;
  submitted = false;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService) { }
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
  handleSubmit = () => {
    const url = ApiPath.changePassword;
    let postObj = {
      ...this.credentialForm.value
    }
    if (this.credentialForm.valid) {
      this.submitted = false;
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res.responseCode == 200) {
          alert(res.responseMessege)
        }
      })
    } else {
      this.submitted = true;
    }
  }
}
