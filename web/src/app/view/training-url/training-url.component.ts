import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { DialogService } from 'primeng/api';
import { MessageComponent } from '../../_shared/_dialogs/message/message.component';
import { HttpService, AuthenticationService, SharedService } from '../../_service';
@Component({
  selector: 'app-training-url',
  templateUrl: './training-url.component.html',
})
export class TrainingUrlComponent implements OnInit {
  carouselitems = [];
  regUsers = [];
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
        } else {
          this.entity = null;
          this.isError = true;
        }
      }
    })
  }
  fetchUserInfo = (item) => {
    this.userInfo = this._AuthenticationService.currentUserValue
    this.isLoggedIn = this.userInfo ? true : false;
    if (this.isLoggedIn) {
      let url = ApiPath.interest;
      url = url.replace('{TrainingId}', item.trainingId.toString())
      this._HttpService.httpCall(url, 'POST', item.trainingId, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Success', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Success')
          item.interestCount = item.interestCount + 1;
          item.isInterested = true;
        } else {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        }
      })
    } else {
      localStorage.setItem('returnurl', this._Router.url);
      this._Router.navigate(['/auth/login']);
    }
  }
  handleInterest = (item) => {
    this.fetchUserInfo(item)
  };
  showDialog() {
    this.display = true;
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
      toEmail: this.entity['email'] ? this.entity['email'] : ''
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
  registerForTraining = () => {
    localStorage.setItem('returnurl', this._Router.url);
    if (this.isLoggedIn) {
      this._Router.navigate(['/placeOrder', this.trainingId])
    } else {
      let msgArray = [
        { mgs: 'You should login first to register for this training.', class: 'confirmMsg' },
        { mgs: 'Do you want to login ?', class: 'subMsg' },
      ]
      this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Information').subscribe(res => {
        if (res) {
          this._Router.navigate(['/auth/login']);
        }
      })
    }
  }

}
