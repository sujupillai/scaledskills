import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
})
export class PersonalComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createprofileForm(() => {

    })
  }

  createprofileForm = (callback) => {
    this.profileForm = this._FormBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'mobileNumber': ['', Validators.required],
      'gender': ['', Validators.required],
      'dateOfBirth': ['', Validators.required],
      'country': ['', Validators.required],
      'state': ['', Validators.required],
      'city': ['', Validators.required],
      'zipCode': ['', Validators.required],
      'interestedAffiliate': false,
      'referalId': '',
    })
    if (callback) {
      callback();
    }
  }
  get formControl() { return this.profileForm.controls }
  handleSubmit = () => {
    let postData = {
      ...this.profileForm.value
    }
    prompt('', JSON.stringify(postData));
  }

}
