import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-certifications-earned',
  templateUrl: './certifications-earned.component.html',
  styleUrls: ['./certifications-earned.component.scss']
})
export class CertificationsEarnedComponent implements OnInit {
  certificatesForm: FormGroup
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(()=>{})
  }
  createForm = (callback) => {
    this.certificatesForm = this._FormBuilder.group({
      'name':['', Validators.required],
      'URL':['', Validators.required],
    })
    if (callback) {
      callback()
    }
  }
  handleSubmit=()=>{
    let postObj={
      ...this.certificatesForm.value
    }
    prompt('postObj',JSON.stringify(postObj))
  }

}
