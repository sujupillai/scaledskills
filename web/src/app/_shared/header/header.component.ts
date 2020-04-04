import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  userInfo: any = {};
  refCode;
  isLoggedIn: boolean = false;
  imageBaseUrl=ApiPath.imageBaseSrc;
  constructor(private _AuthenticationService: AuthenticationService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }

  ngOnInit() {
    this.gerUserInfo();
    this._AuthenticationService.getAuthEmitter().subscribe((customObject) => {
      this.gerUserInfo();
    });
  }
  handleLogOut = () => {
    this._AuthenticationService.logout()
    this.gerUserInfo();
  }
  gerUserInfo = () => {
    this.userInfo = this._AuthenticationService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
  }
  goToLink=()=>{
    this.refCode = null;
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.refCode = params.refCode
    });
    let returnUrl = window.location.pathname;
    localStorage.setItem('returnurl', returnUrl);
    if (this.refCode) {
      this._Router.navigate(['/auth/login'], { queryParams: { refCode: this.refCode } })
    } else {
      this._Router.navigate(['/auth/login']);
    }
  }


}
