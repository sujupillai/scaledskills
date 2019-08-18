import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
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
  constructor(private _FormBuilder: FormBuilder) { }
  aboutForm: FormGroup
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.aboutForm = this._FormBuilder.group(
      {
        profileURL: ['', Validators.required],
        bio: [''],
        coursesOffered: [''],
        language: ['', Validators.required],
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
