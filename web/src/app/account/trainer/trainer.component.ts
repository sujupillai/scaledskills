import { Component, OnInit } from '@angular/core';
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
  constructor() { }
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
    this.setActiveTabIndex = number
  }
}
