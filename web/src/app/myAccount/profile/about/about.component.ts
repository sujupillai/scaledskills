import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  htmlContent = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    toolbarPosition: 'top',
    defaultFontName: 'Times New Roman',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor(private _FormBuilder: FormBuilder) { }
  aboutForm: FormGroup
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.aboutForm = this._FormBuilder.group(
      {
        'profileURL': ['', Validators.required],
        'bio': [''],
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
