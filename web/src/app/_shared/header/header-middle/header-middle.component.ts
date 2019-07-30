import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../auth/authentication.service';
@Component({
  selector: 'app-header-middle',
  templateUrl: './header-middle.component.html',
  styleUrls: ['./header-middle.component.scss']
})
export class HeaderMiddleComponent implements OnInit {

  constructor(private _AuthenticationService:AuthenticationService) { }

  ngOnInit() {
  }
  handleLogOut=()=>{
    this._AuthenticationService.logout()
  }

}
