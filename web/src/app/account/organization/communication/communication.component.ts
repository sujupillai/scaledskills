import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html'
})
export class CommunicationComponent implements OnInit {
  userTypes = []
  constructor() { }

  ngOnInit() {
    this.userTypes = [
      {
        'text': "All"
      },
      {
        'text': "Registered Users"
      },
      {
        'text': "Pending Registration Users"
      },
      {
        'text': "Interested Users"
      }
    ]
  }

}
