import { Component, OnInit } from '@angular/core';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService, SharedService } from 'src/app/_service';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html'
})
export class AddTrainerComponent implements OnInit {
  regTrainers = [];
  msg = null;
  totalTrainer;
  selectedTrainer = [];
  trainerList = [];
  cars = [];
  trainingId = 0;
  settings = {};
  imageBaseUrl = 'https://scaledskills.com/api/Document/p/';
  cols = [];
  defaultList = [{
    "text": "Select",
    "value": "0",
    "isSelect": false
  }]
  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _HttpService: HttpService,
    private _SharedService: SharedService) {
  }

  ngOnInit() {

    this.settings = {
      singleSelection: true, text: "Select", labelKey: "firstName", classes: "myclass custom-class",
      enableSearchFilter: true, searchBy: ['firstName', 'lastName'], searchPlaceholderText: 'Search by name'
    };

    this._ActivatedRoute.parent.params.subscribe((param: any) => {
      this.trainingId = param.id;

      if (this.trainingId == 0) {
        let msgArray = [
          { mgs: 'Sorry! You have to create a training first', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, true, true, false, 'OKAY', 'CANCEL', false, 'Alert').subscribe(res => {
          if (res == 1) {
            this._Router.navigate(['account/trainer/training/0/basic']);
          }
        })
        return
      } else {
        this.fetchTrainingMemberTrainer();
        this.getTrainers();
      }
    });
    this.cars = []
    this.cols = [
      { field: 'firstName', header: 'Name' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
  }

  fetchTrainingMemberTrainer = () => {
    let url = ApiPath.trainingMemberTrainer;
    let postObj = {
      "trainingId": this.trainingId,
      "pageType": "",
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
  viewProfile(prefix, url) {
    let val = window.location.origin + '/' + prefix + '/' + url;
    window.open(val, "_blank");
  }
  getTrainers = () => {
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
        this.trainerList = res['result']['results'];
      }
    })
  }
  OnSelect = (event) => {
    this.msg = null
  }
  onDeSelect = (event) => {
    this.msg = null
  }
  handleAddUser = () => {
    let url = ApiPath.trainingTrainers;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    let existingIem = []
    if (this.selectedTrainer.length > 0) {
      this.trainerList.filter(x => {
        if (x.id == this.selectedTrainer[0].id) {
          existingIem = x
        }
      })
    } else {
      existingIem.length = 0
    }

    if (existingIem.length == 0) {
      this.msg = '';
      let params = {
        trainnerId: this.selectedTrainer[0].id,
        TrainingId: this.trainingId
      }
      this._HttpService.httpCall(url, 'POST', null, params).subscribe(res => {
        if (res && res.responseCode == 200) {
          this.getTrainers()
        }
      })
    }
    else {
      this.msg = 'User already exist';
    }


  }
  handleDeleteUser = (item) => {
    let msgArray = [
      {
        mgs: 'Are you sure you want to delte user ?',
        class: 'confirmMsg'
      },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'Yes', 'No', false, 'alert').subscribe(res => {
      if (res == 1) {
        let url = ApiPath.trainingTrainers;
        url = url.replace('{TrainingId}', this.trainingId.toString());
        let params = {
          trainnerId: item.id,
          TrainingId: this.trainingId
        }
        this._HttpService.httpCall(url, 'DELETE', null, params).subscribe(res => {
          if (res && res.responseCode == 200) {
            let msgArray = [
              {
                mgs: 'user is deleted.',
                class: 'confirmMsg'
              },
            ]
            this._SharedService.dialogConfig(msgArray, true, true, true, 'Yes', 'No', false, 'Message').subscribe(res=>{
              this.totalTrainer = res.result.totalCount;
              this.trainerList = res['result']['results'];
            })
            
          }
        })
      }
    });


  }

}
