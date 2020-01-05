import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-temp',
  templateUrl: './review-temp.component.html',
  styleUrls: ['./review-temp.component.scss']
})
export class ReviewTempComponent implements OnInit {
  headerText = '';
  dataList = [];
  noRecord = [];
  visible: 1;
  url = '';
  postObj = {}
  constructor() { }

  ngOnInit() {
    this.noRecord = [
      { msg: 'No records to display' }
    ];
  }

}
