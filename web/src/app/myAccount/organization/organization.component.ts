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
  constructor() { }

  ngOnInit() {
    this.tabArray = [
      { 'name': 'Personal', 'label': 'basic', 'routeId': '1' },
      { 'name': 'About', 'label': 'about', 'routeId': '4' },
      { 'name': 'Social Media', 'label': 'social', 'routeId': '6' }
    ]
  }
}
