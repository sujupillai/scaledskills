import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-org-basic',
  templateUrl: './org-basic.component.html',
})
export class OrgBasicComponent implements OnInit {
  orgBasicForm: FormGroup
  constructor(private _FormBuilder: FormBuilder) { }
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback: any): void => {
    this.orgBasicForm = this._FormBuilder.group({
      organizationName: ['', Validators.required],
      ownerName: ['', Validators.required],
      baseUrl: ['http://scaledskills.com/o/', Validators.required],
      url: ['scaledskills', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      gst: ['', [Validators.minLength(15)]],
      pan: ['', [Validators.minLength(10)]],
      address: this._FormBuilder.group({
        address1: [''],
        address2: [''],
        address3: [''],
        city: [''],
        zipCode: [''],
        street: [''],
        countryId: [''],
        stateId: [''],
      }),
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.orgBasicForm.controls }
  handleSubmit = () => {
    let dataObj = {
      ...this.orgBasicForm.value
    }
    prompt('dataObj', JSON.stringify(dataObj))
  }
}
