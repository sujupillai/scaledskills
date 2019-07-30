import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _AuthenticationService: AuthenticationService,

  ) {
    if (this._AuthenticationService.currentUserValue) {
      this._Router.navigate(['/']);
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
        "userName": "lovekush@gmail.com",
        "password": "lovekush@gmail.com",
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
    let url = 'http://sujupillai-001-site1.btempurl.com/api/Account/login';

    this._AuthenticationService.login(url, data).pipe(first()).subscribe(data => {
      this._Router.navigate([this.returnUrl]);
    },
      error => {
        this.error = error;
      });
  }

}
