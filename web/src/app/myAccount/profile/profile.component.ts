import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  activeProfileTab: number = 0;
  expandedTab: number = -1;
  tabArray = []
  routeArray = []
  id: number;
  constructor() { }

  ngOnInit() {
    this.routeArray = [
      { 'path': 'basic', 'routeId': '1' },
      { 'path': 'password', 'routeId': '2' },
      { 'path': 'keyword', 'routeId': '3' },
      { 'path': 'about', 'routeId': '4' },
      { 'path': 'certificate', 'routeId': '5' },
      { 'path': 'social', 'routeId': '6' },
    ]
    this.tabArray = [
      { 'name': 'Basic', 'label': 'basic', 'routeId': '1' },
      { 'name': 'Credentials', 'label': 'password', 'routeId': '2' },
      { 'name': 'Keywords', 'label': 'keyword', 'routeId': '3' },
      { 'name': 'About', 'label': 'about', 'routeId': '4' },
      { 'name': 'Certifications Earned', 'label': 'certificate', 'routeId': '5' },
      { 'name': 'Social Media', 'label': 'social', 'routeId': '6' }
    ]
  }

}
