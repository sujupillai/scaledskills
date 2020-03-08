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
  refCode:null;
  isRememberMe: boolean = false;
  error = '';
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _AuthenticationService: AuthenticationService,
    private _SharedService: SharedService,
    public dialogService: DialogService, private _ActivatedRoute:ActivatedRoute
  ) {
    if (this._AuthenticationService.currentUserValue) {
      this._Router.navigate(['/account']);
    }
  }
  ngOnInit() {
    debugger
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
        if (res.responseCode == 200) {
          this._Router.navigate([this.returnUrl]);
          
          localStorage.removeItem('returnUrl')
        } else if (res.responseCode == 406) {
          let msgArray = [
            { mgs: res.responseMessege, class: 'confirmMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Message')
        }
      },
        error => {
          let msgArray = [
            { mgs: error['message']?error['message']:'Server Error', class: 'confirmMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
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
