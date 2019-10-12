import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  userInfo: any = {};
  isLoggedIn: boolean = false;
  constructor(private _AuthenticationService: AuthenticationService) { }

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


}
