import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-training-final',
  templateUrl: './training-final.component.html',
  styleUrls: ['./training-final.component.scss']
})
export class TrainingFinalComponent implements OnInit {
  trainingAgreementForm: FormGroup
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.trainingAgreementForm = this._FormBuilder.group({
      isAgree: false
    })
    if (callback) {
      callback()
    }
  }

}
