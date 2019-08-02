import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../_service';
import { SharedService } from '../../_service'
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isRememberMe: boolean = false;
  error = '';
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _AuthenticationService: AuthenticationService,
    private _SharedService: SharedService

  ) {
    if (this._AuthenticationService.currentUserValue) {
      this._Router.navigate(['/account']);
    }
  }

  ngOnInit() {
    this.createForm(() => {

    })
    this.returnUrl = this._ActivatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }
  createForm = (callback) => {
    this.loginForm = this._FormBuilder.group(
      {
        "userName": ['', Validators.required],
        "password": ['', Validators.required],
        "isRememberMe": false,
        "id": 0
      }
    )
    if (callback) {
      callback()
    }
  }
  handleLogin = () => {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    let data = this.loginForm.value;
    let url = 'Account/login';
    this._AuthenticationService.login(url, data).pipe(first()).subscribe(res => {
      if (res) {
        this._Router.navigate([this.returnUrl]);
        this.resetForm(this.loginForm)
      } else {
        this._SharedService.openSnackBar('Invalid login credentials', 'close')
      }
    },
      error => {
        this.error = error;
      });
  }

  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }
}
