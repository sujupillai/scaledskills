import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html'
})
export class AddTrainingComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit() {

  }

}
