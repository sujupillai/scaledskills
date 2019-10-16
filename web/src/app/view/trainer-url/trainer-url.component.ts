import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService } from '../../_service';
@Component({
  selector: 'app-trainer-url',
  templateUrl: './trainer-url.component.html'
})
export class TrainerUrlComponent implements OnInit {
  cars = [];
  display: boolean = false;
  isSendMesage: boolean = false;
  cities = [];
  carouselitems = [];
  regUsers = [];
  upcommingTrainings = [];
  pastTrainings = [];
  relatedTrainings = [];
  noRecord = [];
  urlString: string = '';
  entity = {};
  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _HttpService: HttpService) {
  }
  ngOnInit() {
    this.noRecord = [
      { msg: 'No records to display' }
    ];
    this.cars=this.noRecord;
    let url = ApiPath.generalUrl
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.urlString = param.url;
      url = url.replace('{urlName}', this.urlString)
      this.getData(url)
    });
  }
  goToLink = (trainingId) => {
    this._Router.navigate(['account/trainer/training/' + trainingId + '/basic']);
  }
  getData = (url) => {
    let params = {
      auth: false
    }
    this._HttpService.httpCall(url, 'GET', null, params).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.entity = res.result;
      }
    })
  }
  showDialog() {
    this.display = true;
  }
  showSendMesage() {
    this.isSendMesage = true;
  }
}
