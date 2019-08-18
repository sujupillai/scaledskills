import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback: any): void => {
    this.profileForm = this._FormBuilder.group({
      organizationName: ['', Validators.required],
      ownerName: ['', Validators.required],
      file:[],
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
      baseUrl: ['http://scaledskills.com/o/', Validators.required],
      url: ['scaledskills', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      gst: ['', [Validators.minLength(15)]],
      pan: ['', [Validators.minLength(10)]],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.profileForm.controls }
  handleSubmit = () => {
    let dataObj = {
      ...this.profileForm.value
    }
    prompt('dataObj', JSON.stringify(dataObj))
  }

}
