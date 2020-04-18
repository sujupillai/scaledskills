import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html'
})
export class GeneralComponent implements OnInit {
  activeProfileTab: number = 0;
  expandedTab: number = -1;
  tabArray = []
  id: number;
  setActiveTabIndex: number = 1;
  items;
  constructor() { }
  ngOnInit() {
    this.tabArray = [
      { label: 'Basic', routerLink: '/account/general/profile/basic' },
      { label: 'Password', routerLink: '/account/general/profile/password' },
      { label: 'Attendee View', routerLink: '/account/general/attendeeView' },
      { label: 'Organizer View', routerLink: '/account/general/organizerView' },
      { label: 'Bank Details', routerLink: '/account/general/bank' },
      { label: 'Communication', routerLink: '/account/general/communication' },
    ];
    
  }
  setActiveTab = (number) => {
    if (this.setActiveTabIndex == number) {
      this.setActiveTabIndex = 0
    } else {
      this.setActiveTabIndex = number
    }
  }
}
