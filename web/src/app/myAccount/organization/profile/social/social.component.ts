import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-org-social',
  templateUrl: './social.component.html',
})
export class OrgSocialComponent implements OnInit {
  orgSocialForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.orgSocialForm = this._FormBuilder.group({
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
      ...this.orgSocialForm.value
    }
    prompt('postObj', JSON.stringify(postObj))
  }

}
