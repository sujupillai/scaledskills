import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html'
})
export class AddTrainingComponent implements OnInit {
  tabArray = [];
  active: boolean = true;
  trainingId;
  constructor(private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.tabArray = [
      { label: 'Basic', routerLink: 'basic', idRequired: false },
      { label: 'Location', routerLink: 'location', idRequired: true },
      { label: 'Tags', routerLink: 'tags', idRequired: true },
      { label: 'Images', routerLink: 'images', idRequired: true },
      // { label: 'Ticket', routerLink: 'ticket' },
      // { label: 'Custom Questions', routerLink: 'questions' },
      // { label: 'Promotions', routerLink: 'promotions' },
      { label: 'Settings', routerLink: 'settings', idRequired: true },
      { label: 'Add Trainer', routerLink: 'addTrainer', idRequired: true },
      { label: 'PUBLISH', routerLink: 'publish', idRequired: true },
    ];
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.trainingId = param.id;
      if (this.trainingId == 0) {
        this.tabArray.map((item) => {
          if (item.idRequired) {
            item.isDisabled = true
          }
        })
      }
    });
  }
}
