import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit {
  activeProfileTab: number = 0;
  expandedTab: number = -1;
  tabArray = []
  id: number;
  setActiveTabIndex: number = 1
  constructor() { }

  ngOnInit() {
    this.tabArray = [
      { label: 'Basic', routerLink: '/account/organization/profile/basic' },
      { label: 'About', routerLink: '/account/organization/profile/about' },
      { label: 'Social', routerLink: '/account/organization/profile/social' },
      { label: 'Bank Details', routerLink: '/account/organization/bank' },
      // { label: 'Communication', routerLink: '/account/organization/communication' },
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
