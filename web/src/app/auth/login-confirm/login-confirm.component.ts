import { Component, OnInit } from '@angular/core';
import { ApiPath } from '../../_helpers/_constants/api';
import { SharedService, HttpService } from '../../_service'
import { DialogService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-confirm',
  templateUrl: './login-confirm.component.html'
})
export class LoginConfirmComponent implements OnInit {
  validateObj;
  isEmailVerify: boolean = false;
  message: string = "Validating email address."
  constructor(private _SharedService: SharedService,
    public dialogService: DialogService, private _HttpService: HttpService, private _ActivatedRoute: ActivatedRoute, private _Router:Router) { }
  ngOnInit() {
    this._ActivatedRoute.queryParams.subscribe(queryParams => {
      this.validateObj = queryParams;
      this.validateObj()
    })
  }
  handleConfirmLogin = () => {
    let postObj = this.validateObj;
    let url = ApiPath.confirmEmail;

    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.isEmailVerify = true;
        this.message = res && res.result ? res.result : 'Email Confirm Successfully';
        setTimeout(() => {
          this._Router.navigate(['/']);
        }, 3000)
      } else {
        this.isEmailVerify = false;
        let msgArray = [
          { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
      }
    },
      error => {
        let msgArray = [
          { mgs: error['message']?error['message']:'Server Error', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
      });
  }
}
