import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as profileConstant from '../../../_helpers/_constants/profile';
import { first } from 'rxjs/operators';
import { HttpService } from '../../../_service/http.service';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService) { }

  ngOnInit() {
    this.createprofileForm(() => {
      this.getUserPofile();
    })
  }
  getUserPofile = () => {
    let url = profileConstant.ApiPath.userBasic;
    this._HttpService.httpCall(url, 'GET', null, null).pipe(first()).subscribe(res => {
      if (res.responseCode == 200) {
        let dataObj = res.result;
        Object.keys(dataObj).forEach(name => {
          if (this.formControl[name]) {
            if (name != 'address') {
              this.formControl[name].setValue(dataObj[name]);
            }
          }
        });

        this.profileForm.get(['address', 'address1']).setValue('himans');
        this.profileForm.get(['address', 'address2']).setValue('address2');
        this.profileForm.get(['address', 'address3']).setValue('address3');
        this.profileForm.get(['address', 'city']).setValue('city');
        this.profileForm.get(['address', 'zipCode']).setValue('zipCode');
        this.profileForm.get(['address', 'street']).setValue('street');
        this.profileForm.get(['address', 'countryId']).setValue('countryId');
        this.profileForm.get(['address', 'stateId']).setValue('stateId');
      }
    })
  }
  createprofileForm = (callback) => {
    this.profileForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
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
      isInterAffiliatePartner: false,
      referralID: '',
      isTrainer: true
    })
    if (callback) {
      callback();
    }
  }

  get formControl() { return this.profileForm.controls }
  handleSubmit = () => {
    let url = profileConstant.ApiPath.userBasic;
    let postData = {
      ...this.profileForm.value,

    }
    this._HttpService.httpCall(url, 'PUT', postData, null).subscribe(res => {
      if (res.result) {
        // this._SharedService.openSnackBar(res.responseMessege, 'close')
      }
    })
  }

}
