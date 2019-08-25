import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-training-promotions',
  templateUrl: './add-training-promotions.component.html'
})
export class AddTrainingPromotionsComponent implements OnInit {
  checked2: boolean = true;
  commission = [];
  constructor() {
    this.commission = [
      { name: 'Amount', code: 'amount' },
      { name: '%', code: '%' }
    ];

  }

  ngOnInit() {
  }

}
