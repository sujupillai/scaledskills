import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../_service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  userInfo: any = {};
  isLoggedIn: boolean = false;
  imageBaseUrl = 'https://scaledskills.com/api/Document/p/';
  constructor(private _SharedService: SharedService) { }

  ngOnInit() {
    this.gerUserInfo();
    this._SharedService.getAuthEmitter().subscribe((customObject) => {
      this.gerUserInfo();
    });
  }
  handleLogOut = () => {
    this._SharedService.logout()
    this.gerUserInfo();
  }
  gerUserInfo = () => {
    this.userInfo = this._SharedService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
  }


}
