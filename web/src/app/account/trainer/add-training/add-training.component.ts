import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html'
})
export class AddTrainingComponent implements OnInit {
  tabArray = [];
  active: boolean = true;
  constructor(private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.tabArray = [
      { label: 'Basic', routerLink: 'basic' },
      { label: 'Location', routerLink: 'location' },
      { label: 'Tags', routerLink: 'tags' },
      { label: 'Images', routerLink: 'images' },
      { label: 'Ticket', routerLink: 'ticket' },
      { label: 'Custom Questions', routerLink: 'questions' },
      { label: 'Promotions', routerLink: 'promotions' },
      { label: 'Settings', routerLink: 'settings' },
      { label: 'Add Trainer', routerLink: 'addTrainer' },
      { label: 'PUBLISH', routerLink: 'publish' },
    ];
  }
}
