import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
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
  routeLinks: any[];
  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  ngOnInit() {
    this.tabArray = [
      { label: 'Basic', routerLink: '/account/trainer/profile/basic' },
      { label: 'About', routerLink: '/account/trainer/profile/about' },
      { label: 'Certifications Earned', routerLink: '/account/trainer/profile/certificate' },
      { label: 'Social Media', routerLink: '/account/trainer/profile/social' },
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
