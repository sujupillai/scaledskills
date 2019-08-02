import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../../_service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService) { }

  ngOnInit() {
    this.createForm(() => {

    })
  }
  createForm = (callback) => {
    this.registerForm = this._FormBuilder.group(
      {
        "firstName": ['', Validators.required],
        "lastName": ['', Validators.required],
        "email": ['', Validators.required],
        "phoneNumber": ['', Validators.required],
        "userName": '',
        "password": ['', Validators.required],
        "id": 0
      }
    )
    if (callback) {
      callback()
    }

  }
  get formControl() { return this.registerForm.controls }

  handleSubmitForm = () => {
    debugger

    let data = {
      ...this.registerForm.value,
      userName: this.formControl.email.value
    };
    if (this.registerForm.valid) {
      let url = 'Account'
      this._HttpService.httpCall(url, 'POST', data, null).pipe(first()).subscribe(res => {
        console.log(res)
      })
    }

  }

}
