import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, AuthenticationService } from 'src/app/_service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  formElement: FormGroup;
  userInfo: any = {};
  isLoggedIn: boolean = false;
  submitted = false;
  constructor(private _FormBuilder: FormBuilder, private _AuthenticationService: AuthenticationService,
    private _HttpService: HttpService) { }
  data;
  ngOnInit() {
    this.createForm(() => {
      this.getUserInfo(() => {
        if (this.isLoggedIn) {
          this.getProfileData()
        }
      })
    })
  }
  createForm = (callback) => {
    this.formElement = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      body: ['', Validators.required],
      seperator: [''],
      id: ['0'],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.formElement.controls }
  getUserInfo = (callback) => {
    this.userInfo = this._AuthenticationService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
    if (callback) {
      callback()
    }
  }
  getProfileData = () => {
    let url = ApiPath.userBasic;
    this._HttpService.httpCall(url, 'GET', null, null).pipe(first()).subscribe(res => {
      debugger
      if (res.responseCode == 200) {
        let dataObj = res.result;
        Object.keys(dataObj).forEach(name => {
          if (this.formControl[name]) {
            this.formControl[name].setValue(dataObj[name]);
          }
        });
      }
    })
  }
  handleSubmit = () => {
    // let postObj = {
    //   ...this.formElement.value
    // }
    // if (this.formElement.invalid) {
    //   this.submitted = true;
    // } else {
    //   const url = ApiPath.trainerEmail
    //   this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
    //     if (res && res.responseCode == 200) {
    //       this.resetForm(this.formElement)
    //     }
    //   }, error => {
    //   })
    // }
  }
  handleCancel = () => {
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
