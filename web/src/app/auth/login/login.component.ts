import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../_service';
import { SharedService } from '../../_service'
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiPath } from '../../_helpers/_constants/api';
import { DialogService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [DialogService]
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
    private _SharedService: SharedService,
    public dialogService: DialogService
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
        userName: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        isRememberMe: false,
        id: 0
      }
    )
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.loginForm.controls }
  handleLogin = () => {
    if (this.loginForm.invalid) {
      this.submitted = true;
      return
    } else {
      this.submitted = false;
      let data = this.loginForm.value;
      let url = ApiPath.Accountlogin;
      this._AuthenticationService.login(url, data).pipe(first()).subscribe(res => {
        if (res) {
          let msgArray = [
            { mgs: 'Login Sucess', class: 'confirmMsg' },
            { mgs: 'Do you want to update profile?', class: 'subMsg' },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
            if (res == 1) {
              this._Router.navigate(['/account']);
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
