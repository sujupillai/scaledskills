import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../_service';
import { first } from 'rxjs/operators';
import { MustMatch } from '../../_helpers/_validators/must-match.validator'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _Router: Router) { }

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
    let data = {
      ...this.registerForm.value,
      userName: this.formControl.email.value
    };

    if (this.registerForm.valid) {
      let url = 'Account'
      this._HttpService.httpCall(url, 'POST', data, null).pipe(first()).subscribe(res => {
        if (res) {
          this.openDialog()
        }
      })

    }
  }
  openDialog(): void {

  }
}
