import { Component, Inject, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '../../../_service'
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  formElement: FormGroup;
  entity;
  objData = null;
  submitted = false;
  redirectUrl = null;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private _FormBuilder: FormBuilder,
    private _HttpService: HttpService) { }
  data;
  ngOnInit() {
    this.data = this.config.data;
    this.objData = this.data.data.objData;
    this.redirectUrl = this.objData && this.objData.url ? 'http://scaledskills.com/t/' + this.objData.url : null
    this.createForm(() => {
      this.formControl['toEmail'].setValue(this.data.data && this.data.data.toEmail ? this.data.data.toEmail : '')
      this.getProfileData();
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
  getProfileData = () => {
    let url = ApiPath.userBasic;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.responseCode == 200) {
        this.entity = res.result;
        let subject = this.entity.firstName + ' ' + this.entity.lastName + ' ' + 'has sent you an enquiry via ScaledSkills';
        this.formControl['subject'].setValue(subject)
      }
    })
  }
  handleSubmit = () => {
    let postObj = {
      ...this.formElement.value
    }
    let bodyData = '<p>' + postObj.body + '</p>'
    let bodyStart = '';
    if (document.getElementById('bodyStart') && this.objData && this.objData.name) {
      bodyStart = document.getElementById('bodyStart').innerHTML;
    }
    let bodyEnd = document.getElementById('bodyEnd').innerHTML;
    postObj.body = bodyStart + bodyData + bodyEnd;
    if (this.formElement.invalid) {
      this.submitted = true;
    } else {
      const url = ApiPath.trainerEmail
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          this.resetForm(this.formElement)
        }
        this.ref.close(res);
      }, error => {
        this.ref.close(error);
      })
    }
  }
  handleCancel = () => {
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
