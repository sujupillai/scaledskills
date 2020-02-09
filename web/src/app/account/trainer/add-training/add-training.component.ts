import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html'
})
export class AddTrainingComponent implements OnInit {
  routeLinks = [];
  active: boolean = true;
  constructor(private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.routeLinks = [
      {
        label: 'Basic',
        link: 'basic',
      }, {
        label: 'Location',
        link: 'location',
      }, {
        label: 'Tags',
        link: 'tags',
      }, {
        label: 'Images',
        link: 'images',
      }, {
        label: 'Ticket',
        link: 'ticket',
      }
      // , {
      //   label: 'Custom Questions',
      //   link: 'questions',
      // }
      // , {
      //   label: 'Promotions',
      //   link: 'promotions',
      // }
      , {
        label: 'Settings',
        link: 'settings',
      }
      , {
        label: 'Add Trainer',
        link: 'addTrainer',
      }
      , {
        label: 'PUBLISH',
        link: 'publish',
      }
    ];
  }
}
