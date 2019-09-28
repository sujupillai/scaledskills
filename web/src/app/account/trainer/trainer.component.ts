import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
@Component({
  selector: 'app-account-trainer',
  templateUrl: '/trainer.component.html'
})
export class TrainerComponent implements OnInit {
  activeProfileTab: number = 0;
  expandedTab: number = -1;
  tabArray = []
  id: number;
  setActiveTabIndex: number = 1
  trainingId: number = 0;
  routeLinks: any[];
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
  setActiveTab = (number) => {
    if (this.setActiveTabIndex == number) {
      this.setActiveTabIndex = 0
    } else {
      this.setActiveTabIndex = number
    }
  }

}
