import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(private _FormBuilder: FormBuilder) { }
  aboutForm: FormGroup
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.aboutForm = this._FormBuilder.group(
      {
        'profileURL': ['', Validators.required],
        'bio': ['', Validators.required],
        'language': ['', Validators.required],

      }
    )
    if (callback) {
      callback()
    }
  }
  handleSubmit = (): void => {
    let postData = {
      ...this.aboutForm.value
    }
    prompt('postData', JSON.stringify(postData))
  }

}
