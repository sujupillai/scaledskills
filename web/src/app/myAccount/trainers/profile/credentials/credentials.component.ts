import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MustMatch } from '../../../../_helpers/_validators/must-match.validator'
@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html'
})
export class CredentialsComponent implements OnInit {
  credentialForm: FormGroup;
  submitted=false;
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(() => {

    })
  }
  createForm = (callback: any): void => {
    this.credentialForm = this._FormBuilder.group({
      currentPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword'),
      })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.credentialForm.controls; }
  handleSubmit = () => {
    this.submitted=true
    let postObj = {
      ...this.credentialForm.value
    }
    prompt('postObj', JSON.stringify(postObj))
  }

}
