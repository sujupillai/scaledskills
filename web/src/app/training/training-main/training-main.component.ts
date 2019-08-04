import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-main',
  templateUrl: './training-main.component.html',
  styleUrls: ['./training-main.component.scss']
})
export class TrainingMainComponent implements OnInit {
  activeProfileTab: number = 0;
  expandedTab: number = -1;
  scrollTop;
  tabArray = []
  constructor() { }

  ngOnInit() {
    this.tabArray = [
      { 'name': 'Basics', 'label': 'Basics', 'displayOrder': '0' },
      { 'name': 'Location', 'label': 'Location', 'displayOrder': '1' },
      { 'name': 'Tags', 'label': 'Tags', 'displayOrder': '2' },
      { 'name': 'Images', 'label': 'Images', 'displayOrder': '3' },
      { 'name': 'Ticket', 'label': 'Ticket', 'displayOrder': '4' },
      { 'name': 'Custom Questions', 'label': 'Custom Questions', 'displayOrder': '5' },
      { 'name': 'Feedback', 'label': 'Feedback', 'displayOrder': '6' },
      { 'name': 'Promotions', 'label': 'Promotions', 'displayOrder': '7' },
      { 'name': 'Settings', 'label': 'Settings', 'displayOrder': '8' },
      { 'name': 'Final', 'label': 'Final', 'displayOrder': '9' },
      { 'name': 'Preview', 'label': 'Preview', 'displayOrder': '9' },
    ]
  }


}
