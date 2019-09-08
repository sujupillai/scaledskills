
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-trainer-url',
  templateUrl: './trainer-url.component.html',
  styleUrls: ['./trainer-url.component.scss']
})
export class TrainerUrlComponent implements OnInit {
  cars = [];
  cols = [];
  display: boolean = false;
  isSendMesage: boolean = false;
  cities=[];

  constructor() {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }
  ngOnInit() {
    this.cars = [
      { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
      { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
      { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
      { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
      { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
      { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
      { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
    ]
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
  }

  showDialog() {
    this.display = true;
  }
  showSendMesage() {
    this.isSendMesage = true;
  }
}
