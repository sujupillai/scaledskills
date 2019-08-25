import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-training-ticket',
  templateUrl: './add-training-ticket.component.html'
})
export class AddTrainingTicketComponent implements OnInit {
  ticketType=[];
  constructor() {
    this.ticketType = [
      {name: 'Normal', code: '1'}
  ];
  }

  ngOnInit() {
  }

}
