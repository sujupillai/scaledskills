import { Component, OnInit } from '@angular/core';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService, AuthenticationService, SharedService } from 'src/app/_service';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html'
})
export class AddTrainerComponent implements OnInit {
  regTrainers = [];
  totalTrainer;
  selectedTrainer = [];
  cars = [];
  trainingId = 0;
  settings = {};
  cols = [];
  defaultList = [{
    "text": "Select",
    "value": "0",
    "isSelect": false
  }]
  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router, private _HttpService: HttpService,
    private _AuthenticationService: AuthenticationService, private _SharedService: SharedService) {
  }

  ngOnInit() {
    
    this.settings = {
      singleSelection: true, text: "Select", labelKey: "firstName", classes: "myclass custom-class", 
      enableSearchFilter: true, searchBy: ['text'], searchPlaceholderText: 'Search by name'
    };

    this._ActivatedRoute.parent.params.subscribe((param: any) => {
      this.trainingId = param.id;
      if (this.trainingId == 0) {
        this.trainingId = 1;
        this.fetchTrainingMemberTrainer()
      }
      // if (this.trainingId == 0) {
      //   let msgArray = [
      //     { mgs: 'Sorry! You have to create a training first', class: 'confirmMsg' },
      //   ]
      //   this._SharedService.dialogConfig(msgArray, true, true, false, 'OKAY', 'CANCEL', false, 'Alert').subscribe(res => {
      //     if (res == 1) {
      //       this._Router.navigate(['account/trainer/training/0/basic']);
      //     }
      //   })
      //   return
      // } else {

      // }
    });
    this.cars = []
    this.cols = [
      { field: 'vin', header: 'Vin' },
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
}
