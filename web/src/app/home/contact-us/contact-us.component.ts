import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, AuthenticationService, SharedService } from 'src/app/_service';
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
    private _HttpService: HttpService, private _SharedService: SharedService) { }
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
      phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
      msg: ['', Validators.required],
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
    let postObj = {
      ...this.formElement.value
    }
    if (this.formElement.invalid) {
      this.submitted = true;
    } else {
      const url = ApiPath.contact
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          let msgArray = [
            {
              mgs: res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess').subscribe(res => {
            this.formControl['msg'].setValue('')
          });
        } else {
          let msgArray = [
            { mgs: res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      }, error => {
        let msgArray = [
          { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      })
    }
  }
}
