import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
@Component({
  selector: 'app-account-trainer',
  templateUrl: './trainer.component.html'
})
export class TrainerComponent implements OnInit {
  activeProfileTab: number = 0;
  expandedTab: number = -1;
  tabArray = []
  id: number;
  setActiveTabIndex: number = 1
  trainingId: number = 0;
  constructor(private _ActivatedRoute:ActivatedRoute, private _Router:Router) { }
  ngOnInit() {
    this.tabArray = [
      { 'name': 'Personal', 'label': 'basic', 'routeId': '1' },
      { 'name': 'Credentials', 'label': 'password', 'routeId': '2' },
      { 'name': 'Keywords', 'label': 'keyword', 'routeId': '3' },
      { 'name': 'About', 'label': 'about', 'routeId': '4' },
      { 'name': 'Certifications Earned', 'label': 'certificate', 'routeId': '5' },
      { 'name': 'Social Media', 'label': 'social', 'routeId': '6' }
    ]
  }
  goToRoute=(path)=>{
    this._ActivatedRoute.paramMap.subscribe((res) => {
      this.trainingId = res['params']['id']?res['params']['id']:0;
      this._Router.navigate( [`account/trainer/addTraining/`+this.trainingId+`/`+path]);
    });
  }
  setActiveTab = (number) => {
    if (this.setActiveTabIndex == number) {
      this.setActiveTabIndex = 0
    } else {
      this.setActiveTabIndex = number
    }
  }
}
