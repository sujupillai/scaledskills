import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  trainingNeedDDL = []
  constructor(private _FormBuilder: FormBuilder) {
    this.trainingNeedDDL = [
      { name: 'Optoiin 1', code: '1' },
    ]
  }
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.requestForm = this._FormBuilder.group({
      trainingNeed: ['', Validators.required],
      trainingType: ['', Validators.required],
      companyName: ['', Validators.required],
      trainingSummary: ['', Validators.required],
      participant: [''],
      description: ['', Validators.required],
      address: this._FormBuilder.group({
        city: [''],
        zipCode: [''],
        street: [''],
        countryId: [''],
        stateId: [''],
      }),
      budget: [''],
      keywords: [''],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.requestForm.controls }
  handleSubmit = () => {
    let postObj = {
      ...this.requestForm.value
    }
    prompt('postObj', JSON.stringify(postObj))
  }
}
