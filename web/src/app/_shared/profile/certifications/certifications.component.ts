import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
})
export class CertificationsComponent implements OnInit {
  certificatesForm: FormGroup
  constructor(private _FormBuilder: FormBuilder) { }
  submitted:boolean=false;
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.certificatesForm = this._FormBuilder.group({
      'name': ['', Validators.required],
      'url': ['', [Validators.required, Validators.pattern(reg)]],
    })
    if (callback) {
      callback()
    }
  }
  handleSubmit = () => {
    this.submitted=true;
    let postObj = {
      ...this.certificatesForm.value
    }
  }

}
