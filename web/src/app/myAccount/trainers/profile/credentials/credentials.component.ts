import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html'
})
export class CredentialsComponent implements OnInit {
  credentialForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(() => {

    })
  }
  createForm = (callback: any): void => {
    this.credentialForm = this._FormBuilder.group({
      'currentPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
    })
    if (callback) {
      callback()
    }
  }
  handleSubmit = () => {
    let postObj = {
      ...this.credentialForm.value
    }
    prompt('postObj', JSON.stringify(postObj))
  }

}
