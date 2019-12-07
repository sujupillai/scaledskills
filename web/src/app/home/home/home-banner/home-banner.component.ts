import { Component, OnInit } from '@angular/core';
import * as service from '../../../_service';
import { ApiPath } from '../../../_helpers/_constants/api'

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
  bannerItems = [];
  noRecord = [
    { msg: 'No records to display' }
  ];
  constructor(private _HttpService: service.HttpService) { }

  ngOnInit() {
    this.getData()
  }
  getData = () => {
    let url = ApiPath.headerTraining;

    url = url.replace('{urlName}', ' ')
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.bannerItems = res.result.topHeaders;
    })
  }

}
