import { Component, OnInit } from '@angular/core';
import { ApiPath } from '../../_helpers/_constants/api';
import { SharedService, HttpService } from '../../_service'
import { DialogService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-confirm',
  templateUrl: './login-confirm.component.html',
  styleUrls: ['./login-confirm.component.scss']
})
export class LoginConfirmComponent implements OnInit {

  constructor(private _SharedService: SharedService,
    public dialogService: DialogService, private _HttpService: HttpService) { }

  ngOnInit() {
  }
  handleConfirmLogin = () => {
    let postObj = {
      "code": " ",
      "userId": "0"
    }
    let url = ApiPath.confirmEmail;
    let params = {
      auth: false
    }
    this._HttpService.httpCall(url, 'POST', postObj, params).subscribe(res => {
      debugger
    })
  }

}
