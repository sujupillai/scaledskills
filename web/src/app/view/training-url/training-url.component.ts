import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { DialogService } from 'primeng/api';
import { MessageComponent } from '../../_shared/_dialogs/message/message.component';
import { ReviewComponent } from '../../_shared/_dialogs/review/review.component';
import { HttpService, AuthenticationService, SharedService } from '../../_service';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-training-url',
  templateUrl: './training-url.component.html',
})
export class TrainingUrlComponent implements OnInit {
  regTrainers = [];
  reviewDisplay=false;
  reviewContent=''
  currentTime = new Date();
  totalTrainer;
  avgRating = 0;
  regUsers = [];
  totalUser;
  imageBaseUrl = 'http://scaledskills.com/api/Document/p/';
  trainingId = 0;
  upcommingTrainings = [];
  pastTrainings = [];
  relatedTrainings = [];
  isVisibleToAll = false;
  noRecord = [];
  trainingSetting;
  display: boolean = false;
  isSendMesage: boolean = false;
  urlString: string = '';
  entity = null;
  userId = 0;
  canEdit: boolean = false;
  userInfo: any = {};
  isLoggedIn: boolean = false;
  isError: boolean = false;
  reviewList = [];
  totalReview = 0;
  shareOptions = [
    { label: 'Facebook', icon: 'fa fa-facebook', command: () => { this.shareAction(1); } },
    { label: 'Whatsapp', icon: 'fa fa-whatsapp', command: () => { this.shareAction(2); } },
    { label: 'Instagram', icon: 'fa fa-instagram', command: () => { this.shareAction(3); } },
    { label: 'Linkedin', icon: 'fa fa-linkedin', command: () => { this.shareAction(4); } },
    { label: 'Twitter', icon: 'fa fa-twitter', command: () => { this.shareAction(5); } },
    { label: 'Copy Url', icon: 'fa fa-clone', command: () => { this.copyToClipboard(); } },
  ];
  constructor(public dialogService: DialogService,
    private _titleService: Title,
    private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _HttpService: HttpService, private _AuthenticationService: AuthenticationService, private _SharedService: SharedService) {
  }
  ngOnInit() {
    this.noRecord = [
      { msg: 'No records to display' }
    ];
    let url = ApiPath.trainingUrl;
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.urlString = param.url;
      url = url.replace('{urlName}', this.urlString)
      this.getUser()
      this.getData(url)
    });
    localStorage.removeItem('returnurl');
  }
  fetchPastTraining = () => {
    let postObj = {
      "userId": this.userId,
      "pageType": this.entity.hostedBy == 2 ? 'O' : 'P',
      "searchText": "",
      "pageSize": 1000,
      "page": 0
    }
    let url = ApiPath.pastTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.pastTrainings = res.result.results;
    })
  }
  FetchRelatedTraining = () => {
    let postObj = {
      "userId": this.trainingId,
      "pageType": this.entity.hostedBy == 2 ? 'O' : 'P',
      "searchText": "",
      "pageSize": 1000,
      "page": 0
    }
    let url = ApiPath.relatedTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.relatedTrainings = res.result.results;
    })
  }
  fetchTrainingReview = () => {
    let postObj = {
      "userId": this.trainingId,
      "pageType": "T",
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
  fetchUpcomingTraining = () => {
    let postObj = {
      "userId": this.userId,
      "pageType": this.entity.hostedBy == 2 ? 'O' : 'P',
      "searchText": "",
      "pageSize": 1000,
      "page": 0
    }
    let url = ApiPath.upcomingTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.upcommingTrainings = res.result.results;
    })
  }
  getTrainingSeting = () => {
    let url = ApiPath.trainingSettings;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.trainingSetting = res.result
    })
  }
  getUser = () => {
    this.userInfo = this._AuthenticationService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
  }
  getData = (url) => {
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.entity = res.result;
        this.userId = this.entity['userId'];
        this.canEdit = res.result.canEdit;
        this.trainingId = this.entity['trainingId']
        if (this.trainingId > 0) {
          let temp = document.title;
          this._titleService.setTitle(this.entity.name + '- ScaledSkills | Transforming Training');
          this.isError = false;
          if (!this.entity.isOnlineDetailsVisible) {
            this.isVisibleToAll = true
          } else {
            this.isVisibleToAll = this.entity.isRegister ? true : false
          }
          this.fetchPastTraining();
          this.fetchUpcomingTraining();
          this.fetchTrainingMemberRegister();
          this.fetchTrainingMemberTrainer();
          this.FetchRelatedTraining();
          this.getTrainingSeting();
          this.fetchTrainingReview()
        } else {
          this.entity = null;
          this.isError = true;
        }
      }
    })
  }
  goToLink = (trainingId) => {
    this._Router.navigate(['account/trainer/training/' + trainingId + '/basic']);
  }
  fetchTrainingMemberRegister = () => {
    let url = ApiPath.trainingMemberRegister;
    let postObj = {
      "trainingId": this.trainingId,
      "pageType": "P",
      "searchText": "",
      "pageSize": 500,
      "page": 0
    }
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.totalUser = res.result.totalCount;
        this.regUsers = res['result']['results'];
      }
    })
  }
  fetchTrainingMemberTrainer = () => {
    let url = ApiPath.trainingMemberTrainer;
    let postObj = {
      "trainingId": this.trainingId,
      "pageType": "P",
      "searchText": "",
      "pageSize": 500,
      "page": 0
    }
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.totalTrainer = res.result.totalCount;
        this.regTrainers = res['result']['results'];
      }
    })
  }
  showReviewDialog(content) {
    this.reviewContent=content;
    this.reviewDisplay = true;
  }
  openMessageDialog = (dialogConfig, dialogHeader, component) => {
    return this.dialogService.open(component, {
      data: {
        ...dialogConfig
      },
      header: dialogHeader,
      width: '80%'
    });
  }
  messageDialogConfig = (data, header, type) => {
    let dialogConfig = {
      data: data,
    };
    let dialogHeader = header;
    let component
    if (type == 1) {
      component = MessageComponent
    } else if (type == 2) {
      component = ReviewComponent
    }
    let ref = this.openMessageDialog(dialogConfig, dialogHeader, component);
    return ref.onClose;
  }
  showSendMesage() {
    let data = {
      toEmail: this.entity['email'] ? this.entity['email'] : ''
    }
    this.messageDialogConfig(data, 'Send Email', 1).subscribe(res => {
      if (res != undefined) {
        if (res && res.responseCode == 200) {
          let msgArray = [
            {
              mgs: res && res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess');
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      }
    })
  }
  handleFeedback = () => {
    let data = {
      trainingId: this.trainingId
    }
    this.messageDialogConfig(data, 'Feedback', 2).subscribe(res => {
      if (res != undefined) {
        if (res && res.responseCode == 200) {
          let msgArray = [
            {
              mgs: res && res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess').subscribe(res => {
            this.fetchTrainingReview()
          });
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      }
    })
  }
  goToLogin = () => {
    localStorage.setItem('returnurl', this._Router.url); let msgArray = [
      { mgs: 'You should login first to register for this training.', class: 'confirmMsg' },
      { mgs: 'Do you want to login ?', class: 'subMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Information').subscribe(res => {
      if (res) {
        this._Router.navigate(['/auth/login']);
      }
    })
  }
  registerForTraining = () => {
    localStorage.setItem('returnurl', this._Router.url);
    if (this.isLoggedIn) {
      this._Router.navigate(['/t/'+this.entity.url+'/'+this.trainingId+'/booking' ])
    } else {
      this.goToLogin();
    }
  }
  hendleFollowMe = () => {
    if (this.isLoggedIn) {
      let url = ApiPath.followTraining;
      let postObj = {
        typeId: this.trainingId
      }
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          this.entity['isFollow'] = true;
        }
      })
    } else {
      this.goToLogin();
    }
  }
  handleInterest = (item) => {
    if (this.isLoggedIn) {
      let url = ApiPath.interest;
      url = url.replace('{TrainingId}', item.trainingId.toString())
      let postData = {
        isInterest: !item.isInterest
      }
      this._HttpService.httpCall(url, 'POST', postData, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          item.interestCount = res['result'];
          item.isInterest = !item.isInterest;
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      })
    } else {
      this.goToLogin();
    }
  };
  openUrl(urlToOpen) {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += 'http://';
    }
    url += urlToOpen;
    window.open(url, '_blank');
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
  getColor = (endDate) => {
    if (new Date(endDate).getTime() < this.currentTime.getTime()) {
      return 'disabled'
    } else {
      return 'enable'
    }

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
  viewProfile(prefix, url) {
    let val = window.location.origin + '/' + prefix + '/' + url;
    window.open(val, "_blank");
  }
  
}
