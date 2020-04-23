import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService } from 'src/app/_service';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html'
})
export class AddTrainingComponent implements OnInit {
  tabArray = [];
  active: boolean = true;
  trainingId;
  trainingData = null;
  isPublished = false;
  constructor(private _ActivatedRoute: ActivatedRoute, private _HttpService: HttpService) { }
  ngOnInit() {
    this.tabArray = [
      { label: 'Basic', routerLink: 'basic', idRequired: false },
      { label: 'Location', routerLink: 'location', idRequired: true },
      { label: 'Tags', routerLink: 'tags', idRequired: true },
      { label: 'Images', routerLink: 'images', idRequired: true },
      // { label: 'Ticket', routerLink: 'ticket' },
      // { label: 'Custom Questions', routerLink: 'questions' },
      // { label: 'Promotions', routerLink: 'promotions' },
      { label: 'Settings', routerLink: 'settings', idRequired: true },
      { label: 'Add Trainer', routerLink: 'addTrainer', idRequired: true },
      { label: 'PUBLISH', routerLink: 'publish', idRequired: true, isPublisedReq: true },
    ];
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.trainingId = param.id;
      if (this.trainingId == 0) {
        this.tabArray.map((item) => {
          if (item.idRequired) {
            item.isDisabled = true
          }
        })
      } else {
        this.getData(this.trainingId);
      }
    });
  }
  getData = (id) => {
    this.trainingData = null;
    let url = ApiPath.getTraining
    url = url.replace('{id}', id)
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.result) {
        this.trainingData = res.result;
        this.isPublished = this.trainingData.trainingStatus == 1 ? true : false;
      }
    })
  }
}
