import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../_service';
import { SharedService } from '../../_service'
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import * as authConstant from '../../_helpers/_constants';
import { DialogService } from 'primeng/api';
import { ConfirmationDialogComponent } from '../../_shared/confirmation-dialog/confirmation-dialog.component'
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
  openConfirmDialog = (mesage) => {
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
        alert(res)
      }
    });
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
    let dialogHeader = "Alert!!";
    let dialogWidth: '50'
    const ref = this._SharedService.openDialog(dialogConfig, dialogHeader, dialogWidth);
    ref.onClose.subscribe((res) => {
      if (res) {
        alert(res)
      }
    });
  }
  handleLogin = () => {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    let data = this.loginForm.value;
    let url = authConstant.ApiPath.Accountlogin;
    this._AuthenticationService.login(url, data).pipe(first()).subscribe(res => {
      if (res) {
        // this.openAlertDialog('Log in success')
        this._Router.navigate([this.returnUrl]);
        this.resetForm(this.loginForm)
      } else {
        this.openAlertDialog('Something went wrong')
      }
    },
      error => {
        this.error = error;
        this.openAlertDialog(this.error['error'])
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
