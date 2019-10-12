import { Component, OnInit } from '@angular/core';
import * as service from '../../../_service';
import { ApiPath } from '../../../_helpers/_constants/api'

@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
})
export class HomeAddComponent implements OnInit {
  carouselItems = [];
  constructor(private _HttpService: service.HttpService) { }

  ngOnInit() {
    this.getData()
  }
  getData = () => {
    let url = ApiPath.headerTraining;
    let params={
      auth:false
    }
    url = url.replace('{urlName}', ' ')
    this._HttpService.httpCall(url, 'GET', null, params).subscribe(res => {
      this.carouselItems=res.result.trainings;
    })
  }
  /* setPage(page) {
    //prompt('page', JSON.stringify(page));
    // this.page = page;
  } */

}
