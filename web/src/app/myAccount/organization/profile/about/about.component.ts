import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-org-about',
  templateUrl: './about.component.html'
})
export class OrgAboutComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Bio...',
    translate: 'no',

    toolbarPosition: 'top',
    defaultFontName: 'Times New Roman',
  };
  coursesOffered: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Courses Offered...',
    translate: 'no',

    toolbarPosition: 'top',
    defaultFontName: 'Times New Roman',
  };
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
