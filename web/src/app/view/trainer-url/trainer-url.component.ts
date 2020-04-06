import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, SharedService, AuthenticationService } from '../../_service';
import { DialogService } from 'primeng/api';
import { MessageComponent } from '../../_shared/_dialogs/message/message.component';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-trainer-url',
  templateUrl: './trainer-url.component.html'
})
export class TrainerUrlComponent implements OnInit {
  iframe_html: any = null;
  cars = [];
  memberList = [];
  isLoading: boolean = true;
  totalMember = 0;
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
  imageBaseUrl = ApiPath.imageBaseSrc;
  reviewList = [];
  totalReview = 0;
  avgRating;
  userInfo: any = {};
  isLoggedIn: boolean = false;
  safeSrc: SafeResourceUrl;
  shareOptions = [
    { label: 'Facebook', icon: 'fa fa-facebook', command: () => { this.shareAction(1); } },
    { label: 'Whatsapp', icon: 'fa fa-whatsapp', command: () => { this.shareAction(2); } },
    { label: 'Instagram', icon: 'fa fa-instagram', command: () => { this.shareAction(3); } },
    { label: 'Linkedin', icon: 'fa fa-linkedin', command: () => { this.shareAction(4); } },
    { label: 'Twitter', icon: 'fa fa-twitter', command: () => { this.shareAction(5); } },
    { label: 'Copy Url', icon: 'fa fa-clone', command: () => { this.copyToClipboard(); } },
  ];
  origin = window.location.origin;
  constructor(public dialogService: DialogService,
    private sanitizer: DomSanitizer,
    private embedService: EmbedVideoService,
    private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _HttpService: HttpService,
    private _SharedService: SharedService, private _AuthenticationService: AuthenticationService) {
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
  getUser = () => {
    this.userInfo = this._AuthenticationService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
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
  copyToClipboard = () => {
    let url = origin + this._Router.url;
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (url));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
  goToLink = (trainingId) => {
    this._Router.navigate(['account/trainer/training/' + trainingId + '/basic']);
  }
  setYoutubeUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2]  : null;
  }
  getData = (url) => {
    this.isLoading = true;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.trainerId = res['result']['user'] && res['result']['user']['id'] > 0 ? res['result']['user']['id'] : 0;
        if (this.trainerId > 0) {
          this.entity = res.result ? res.result : null;
          this.isError = false;
          this.fetchPastTraining();
          this.fetchUpcomingTraining();
          this.fetchMembers();
          this.fetchTrainingReview();
          if (this.entity.about && this.entity.about.videoUrl) {
            this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/' + this.setYoutubeUrl(this.entity.about.videoUrl)+'?autoplay=1');
          }
        }
        else {
          this.entity = null;
          this.isError = true;
        }
        this.isLoading = false
      }
    })
  }
  fetchPastTraining = () => {
    let postObj = {
      "userId": this.trainerId,
      "searchText": "",
      "pageType": 'P',
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
      "pageType": 'P',
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
  showSendMesage() {
    let data = {
      toEmail: this.entity.user.email ? this.entity.user.email : ''
    }
    this.messageDialogConfig(data, 'Send Email').subscribe(res => {
      if (res != undefined) {
        if (res && res.responseCode == 200) {
          let msgArray = [
            {
              mgs: res && res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Success');
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      }
    })
  }
  fetchMembers = () => {
    let url = ApiPath.generalMemberFollow;
    let postObj = {
      "id": this.trainerId,
      "pageType": "P",
      "searchText": "",
      "pageSize": 500,
      "page": 0
    }
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.totalMember = res.result.totalCount;
        this.memberList = res['result']['results'];
      }
    })
  }
  fetchTrainingReview = () => {
    let postObj = {
      "userId": this.trainerId,
      "pageType": "P",
      "searchText": "",
      "pageSize": 1000,
      "page": 0
    }
    let url = ApiPath.getTrainingReview;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.reviewList = res.result.results
      this.totalReview = res.result.totalCount;
      this.avgRating = res.result.avgRating
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
    let url = ApiPath.followTrainer;
    let postObj = {
      typeId: this.trainerId
    }
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.entity['isFollow'] = true;
        this.fetchMembers();
      }
    })
  }
}
