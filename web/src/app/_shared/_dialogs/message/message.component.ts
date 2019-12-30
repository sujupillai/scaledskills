import { Component, Inject, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '../../../_service'
import { ApiPath } from 'src/app/_helpers/_constants/api';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  formElement: FormGroup;
  submitted=false;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private _FormBuilder: FormBuilder, 
    private _HttpService:HttpService) { }
  data;
  ngOnInit() {
    this.data = this.config.data;
    this.createForm(() => {
      this.formControl['toEmail'].setValue(this.data.data && this.data.data.toEmail ? this.data.data.toEmail:'')
  })
  }
  createForm = (callback) => {
    this.formElement = this._FormBuilder.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      seperator: [''],
      id: ['0'],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.formElement.controls }
  handleSubmit = () => {
    let postObj = {
      ...this.formElement.value
    }
    if (this.formElement.invalid) {
      this.submitted = true;
    } else {
      const url =ApiPath.trainerEmail
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          this.resetForm(this.formElement)
          }
        this.ref.close(res);
      }, error => {
        this.ref.close(error);
      })
    }
    // this.ref.close(data);
  }
  handleCancel=()=>{
    this.ref.close();
  }
  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }
}
