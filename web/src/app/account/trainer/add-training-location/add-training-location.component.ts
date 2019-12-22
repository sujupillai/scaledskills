import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service'
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-training-location',
  templateUrl: './add-training-location.component.html',
})
export class AddTrainingLocationComponent implements OnInit {
  modeType=1;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  ngOnInit() {


  }
}
