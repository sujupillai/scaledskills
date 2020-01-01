import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  currentDate;
  constructor() { }

  ngOnInit() {
    this.currentDate=new Date()
  }

}
