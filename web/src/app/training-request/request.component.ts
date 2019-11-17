import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiPath } from '../_helpers/_constants/api';
import { first } from 'rxjs/operators';
import { HttpService, SharedService } from '../_service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  trainingId = 0;
  items: any[];
  @ViewChild('menuItems', { static: false }) menu: any[];
  activeItem: any;
  submitted: boolean = false;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _ActivatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.trainingId = param.id
    });
    this.items = [
      { label: 'Request', index: 0 },
      { label: 'Response', index: 1 }
    ];
    this.activeItem = this.items[1];
  }

  activateMenu(item) {
    this.activeItem = this.menu['activeItem'];
  }
}
