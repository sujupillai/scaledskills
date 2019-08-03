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
    alert(this.certificatesForm.valid)
    let postObj = {
      ...this.certificatesForm.value
    }
    prompt('postObj', JSON.stringify(postObj))
  }

}
