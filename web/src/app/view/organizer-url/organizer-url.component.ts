import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, SharedService } from '../../_service';
import { DialogService } from 'primeng/api';
import { MessageComponent } from '../../_shared/_dialogs/message/message.component';
@Component({
  selector: 'app-organizer-url',
  templateUrl: './organizer-url.component.html'
})
export class OrganizerUrlComponent implements OnInit {
  cars = [];
  display: boolean = false;
  isSendMesage: boolean = false;
  cities = [];
  carouselitems = [];
  orgId = 0;
  isError = false;
  regUsers = [];
  reviews = [];
  upcommingTrainings = [];
  fbUrl: string = 'www.fb.com'
  pastTrainings = [];
  relatedTrainings = [];
  noRecord = [];
  urlString: string = '';
  trainingEntity = {
    "userId": this.orgId,
    "searchText": "",
    "pageSize": 1000,
    "page": 0
  }
  entity = null;
  reviewList=[];
  totalReview=0;
  avgRating=0;
  shareOptions = [
    { label: 'Facebook', icon: 'fa fa-facebook', command: () => { this.shareAction(1); } },
    { label: 'Whatsapp', icon: 'fa fa-whatsapp', command: () => { this.shareAction(2); } },
    { label: 'Instagram', icon: 'fa fa-instagram', command: () => { this.shareAction(3); } },
    { label: 'Linkedin', icon: 'fa fa-linkedin', command: () => { this.shareAction(4); } },
    { label: 'Twitter', icon: 'fa fa-twitter', command: () => { this.shareAction(5); } },
    { label: 'Copy Url', icon: 'fa fa-clone', command: () => { this.copyToClipboard(); } },
  ];
  constructor(public dialogService: DialogService,
    private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _HttpService: HttpService, private _SharedService: SharedService) {
  }
  ngOnInit() {
    this.noRecord = [
      { msg: 'No records to display' }
    ];
    this.cars = this.noRecord;
    let url = ApiPath.orgUrl
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
        this.orgId = res['result']['user'] && res['result']['user']['id'] > 0 ? res['result']['user']['id'] : 0;
        if (this.orgId > 0) {
          this.entity = res.result ? res.result : null;
          this.fetchPastTraining();
          this.fetchUpcomingTraining();
          this.fetchTrainingReview();
        }
        else {
          this.entity = null;
          this.isError = true;
        }
      }
    })
  }
  httpFetch = (url, postObj, masterCollection) => {
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this[masterCollection] = res.result.results;
    })
  }
  fetchPastTraining = () => {
    let postObj = {
      ...this.trainingEntity
    }
    let url = ApiPath.pastTraining;
    this.httpFetch(url, postObj, 'pastTrainings');
  }
  fetchUpcomingTraining = () => {
    let postObj = {
      ...this.trainingEntity
    }
    let url = ApiPath.upcomingTraining;
    this.httpFetch(url, postObj, 'upcommingTrainings');
  }
  showDialog(collection) {
    this[collection] = true;
  }
  openMessageDialog = (dialogConfig, dialogHeader) => {
    return this.dialogService.open(MessageComponent, {
      data: {
        ...dialogConfig
      },
      header: dialogHeader,
      width: '80%'
    });
  }
  messageDialogConfig = (data, header) => {
    let tempRes;
    let dialogConfig = {
      data: data,
    };
    let dialogHeader = header;
    let ref = this.openMessageDialog(dialogConfig, dialogHeader);
    return ref.onClose;
  }
  successMsg = (res) => {
    let msgArray = [
      {
        mgs: res && res.responseMessege ? res.responseMessege : 'Success',
        class: 'confirmMsg'
      },
    ]
    this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess');
  }
  errorMsg = (res) => {
    let msgArray = [
      { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
    ]
    this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
  }
  showSendMesage() {
    let data = {
      toEmail: this.entity.user.email ? this.entity.user.email : ''
    }
    this.messageDialogConfig(data, 'Send Email').subscribe(res => {
      if (res != undefined) {
        if (res && res.responseCode == 200) {
          this.successMsg(res);
        } else {
          this.errorMsg(res);
        }
      }
    })
  }
  copyToClipboard = () => {
    let url = origin + this._Router.url;
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (url));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
  shareAction = (type) => {
    let url;
    let urlPostFix = origin + this._Router.url;
    if (type == 1) {
      url = ApiPath.social.fb
    } else if (type == 2) {
      url = ApiPath.social.whatsapp
    } else if (type == 3) {
      url = ApiPath.social.insta
    } else if (type == 4) {
      url = ApiPath.social.linkdin
    } else if (type == 5) {
      url = ApiPath.social.twitter
    }
    this.openUrl(url + urlPostFix)
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
      typeId: this.orgId
    }
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.entity['isFollow'] = true;
      }
    })
  }
  fetchTrainingReview = () => {
    let postObj = {
      "userId": this.orgId,
      "pageType": "O",
      "searchText": "",
      "pageSize": 1000,
      "page": 0
    }
    let url = ApiPath.getTrainingReview;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      debugger
      this.reviewList=res.result.results
      this.totalReview=res.result.totalCount;
      this.avgRating =res.result.avgRating
    })
  }
}
