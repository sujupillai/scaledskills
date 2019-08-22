import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
})
export class SocialComponent implements OnInit {
  socialForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.socialForm = this._FormBuilder.group({
      'website': '',
      'linkedIn': '',
      'facebook': '',
      'twitter': '',
    })
    if (callback) {
      callback()
    }
  }
  handleSubmit = () => {
    let postObj = {
      ...this.socialForm.value
    }
    prompt('postObj', JSON.stringify(postObj))
  }

}
