
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  descriptionConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Description...',
    translate: 'no',

    toolbarPosition: 'top',
    defaultFontName: 'Times New Roman',
  };
  constructor(private _FormBuilder: FormBuilder, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.requestForm = this._FormBuilder.group({
      trainingNeed: ['', Validators.required],
      trainingType: ['', Validators.required],
      companyName: ['', Validators.required],
      trainingSummary: ['', Validators.required],
      description: ['', Validators.required],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.requestForm.controls }
  handleSubmit = () => {
    let postObj = {
      ...this.requestForm.value
    }
    prompt('postObj', JSON.stringify(postObj))
  }
}
