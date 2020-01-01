import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { DialogService } from 'primeng/api';
import { MessageComponent } from '../../_shared/_dialogs/message/message.component';
import { ReviewComponent } from '../../_shared/_dialogs/review/review.component';
import { HttpService, AuthenticationService, SharedService } from '../../_service';
@Component({
  selector: 'app-training-url',
  templateUrl: './training-url.component.html',
})
export class TrainingUrlComponent implements OnInit {
  regTrainers = [];
  totalTrainer;
  regUsers = [];
  totalUser;
  trainingId = 0;
  upcommingTrainings = [];
  pastTrainings = [];
  relatedTrainings = [];
  noRecord = [];
  display: boolean = false;
  isSendMesage: boolean = false;
  urlString: string = '';
  entity = {};
  userId = 0;
  canEdit: boolean = false;
  userInfo: any = {};
  isLoggedIn: boolean = false;
  isError: boolean = false;
  shareOptions = [
    { label: 'Facebook', icon: 'fa fa-facebook', command: () => { this.shareAction(1); } },
    { label: 'Whatsapp', icon: 'fa fa-whatsapp', command: () => { this.shareAction(2); } },
    { label: 'Instagram', icon: 'fa fa-instagram', command: () => { this.shareAction(3); } },
    { label: 'Linkedin', icon: 'fa fa-linkedin', command: () => { this.shareAction(4); } },
    { label: 'Twitter', icon: 'fa fa-twitter', command: () => { this.shareAction(5); } },
    { label: 'Copy Url', icon: 'fa fa-clone', command: () => { this.copyToClipboard(); } },
  ];
  constructor(public dialogService: DialogService,
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
  getUser = () => {
    this.userInfo = this._AuthenticationService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
  }
  fetchPastTraining = () => {
    let postObj = {
      "userId": this.userId,
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
      "userId": this.userId,
      "searchText": "",
      "pageSize": 1000,
      "page": 0
    }
    let url = ApiPath.upcomingTraining;
    this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
      this.upcommingTrainings = res.result.results;
    })
  }
  goToLink = (trainingId) => {
    this._Router.navigate(['account/trainer/training/' + trainingId + '/basic']);
  }
  getData = (url) => {
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.entity = res.result;
        this.userId = this.entity['userId'];
        this.canEdit = res.result.canEdit;
        this.trainingId = this.entity['trainingId']
        if (this.trainingId > 0) {
          this.isError = false;
          this.fetchPastTraining();
          this.fetchUpcomingTraining();
          this.fetchTrainingMemberRegister();
           this.fetchTrainingMemberTrainer();
        } else {
          this.entity = null;
          this.isError = true;
        }
      }
    })
  }
  fetchTrainingMemberRegister=()=>{
    let url=ApiPath.trainingMemberRegister;
    let postObj={
      "trainingId": this.trainingId,
      "pageType": "P",
      "searchText": "",
      "pageSize": 500,
      "page": 0
    }
    this._HttpService.httpCall(url, 'POST',postObj, null).subscribe(res=>{
      if(res && res.responseCode==200){
        this.totalUser=res.result.totalCount;
        this.regUsers=res['result']['results'];
      }
    })
  }
 
  fetchTrainingMemberTrainer=()=>{
    let url=ApiPath.trainingMemberTrainer;
    let postObj={
      "trainingId": this.trainingId,
      "pageType": "P",
      "searchText": "",
      "pageSize": 500,
      "page": 0
    }
    this._HttpService.httpCall(url, 'POST',postObj, null).subscribe(res=>{
      if(res && res.responseCode==200){
        this.totalTrainer=res.result.totalCount;
        this.regTrainers=res['result']['results'];
      }
    })
  }
 
  showDialog() {
    this.display = true;
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
    this.messageDialogConfig(data, 'Send Email', 2).subscribe(res => {
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
      this._Router.navigate(['/placeOrder', this.trainingId])
    } else {
      this.goToLogin();
    }
  }
  hendleFollowMe = () => {
    if (this.isLoggedIn) {
      let url = ApiPath.trainingFollow;
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
    debugger
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
    if (type == 1) {
      url = 'https://www.facebook.com/share.php?u=' + origin
    } else if (type == 2) {
      url = 'https://web.whatsapp.com/send?text=' + origin
    } else if (type == 3) {
      url = 'https://www.instagram.com/?url=' + origin
    } else if (type == 4) {
      url = 'https://www.linkedin.com/shareArticle?mini=true&url=' + origin
    } else if (type == 5) {
      url = 'http://twitter.com/home?status=' + origin
    }
    this.openUrl(url)
  }
  copyToClipboard=()=> {
    let url=origin+this._Router.url;
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (url));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
  viewProfile(prefix, url) {
    let val = window.location.origin +'/'+ prefix +'/'+ url;
    window.open(val, "_blank");
  }
}
