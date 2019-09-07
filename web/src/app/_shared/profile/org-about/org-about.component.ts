import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-org-about',
  templateUrl: './org-about.component.html'
})
export class OrgAboutComponent implements OnInit {

  constructor(private _FormBuilder: FormBuilder, private cd: ChangeDetectorRef) { }
  aboutForm: FormGroup
  ngOnInit() {
    this.createForm(() => { })
  }

  createForm = (callback) => {
    this.aboutForm = this._FormBuilder.group(
      {
        bio: [''],
        coursesOffered: ['']
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
