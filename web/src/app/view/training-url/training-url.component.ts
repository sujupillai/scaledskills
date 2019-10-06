import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-training-url',
  templateUrl: './training-url.component.html',
})
export class TrainingUrlComponent implements OnInit {
  cars = [];
  display: boolean = false;
  isSendMesage: boolean = false;
  constructor() {

  }
  ngOnInit() {
    this.getData()
  }
  getData=()=>{

  }
  showDialog() {
    this.display = true;
  }
  showSendMesage() {
    this.isSendMesage = true;
  }
}
