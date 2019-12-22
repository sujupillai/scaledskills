import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, SharedService } from '../../_service';
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
  trainerId = 0;
  isError = false;
  regUsers = [];
  reviews = [];
  upcommingTrainings = [];
  fbUrl: string = 'www.fb.com'
  pastTrainings = [];
  relatedTrainings = [];
  noRecord = [];
  urlString: string = '';
  entity = null;
  shareOptions = [
    { label: 'Facebook', icon: 'fa fa-facebook' },
    { label: 'Whatsapp', icon: 'fa fa-whatsapp' },
    { label: 'Instagram', icon: 'fa fa-instagram' },
    { label: 'Linkedin', icon: 'fa fa-linkedin' },
    { label: 'Twitter', icon: 'fa fa-twitter' },
    { label: 'Copy Url', icon: 'fa fa-clone' },
  ];
  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _HttpService: HttpService, private _SharedService: SharedService) {
  }
  ngOnInit() {
    this.noRecord = [
      { msg: 'No records to display' }
    ];
    this.cars = this.noRecord;
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
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.trainerId = res['result']['user'] && res['result']['user']['id'] > 0 ? res['result']['user']['id'] : 0;
        if (this.trainerId > 0) {
          this.entity = res.result ? res.result : null;
          this.fetchPastTraining();
          this.fetchUpcomingTraining();
        }
        else {
          this.entity = null;
          this.isError = true;
        }
      }
    })
  }
  fetchPastTraining = () => {
    let postObj = {
      "userId": this.trainerId,
      "searchText": "",
      "pageSize": 1000,
      "page": 0
    }
    let url = ApiPath.pastTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.pastTrainings = res.result.results;
    })
  }
  fetchUpcomingTraining = () => {
    let postObj = {
      "userId": this.trainerId,
      "searchText": "",
      "pageSize": 1000,
      "page": 0
    }
    let url = ApiPath.upcomingTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.upcommingTrainings = res.result.results;
    })
  }
  showDialog(collection) {
    this[collection] = true;

  }
  showSendMesage() {
    let data = {
      toEmail: this.entity.user.email ? this.entity.user.email : ''
    }
    this._SharedService.messageDialogConfig(data, 'Send Email').subscribe(res => {
      if (res != undefined) {
        if (res && res.responseCode == 200) {
          let msgArray = [
            {
              mgs: res && res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess');
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        }
      }
    })
  }
  openUrl(urlToOpen) {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }
    url += urlToOpen;
    window.open(url, '_blank');
  }
  hendleFollowMe = () => {
    let url = ApiPath.trainerFollow;
    let postObj = {
      typeId: this.trainerId
    }
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
    })
  }
}
