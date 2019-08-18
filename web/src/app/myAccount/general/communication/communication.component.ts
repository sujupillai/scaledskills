import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-gen-communication',
  templateUrl: './communication.component.html'
})
export class GenCommunicationComponent implements OnInit {
  communicationForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }
  messageConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter your message...',
    translate: 'no',
    toolbarPosition: 'top',
    defaultFontName: 'Times New Roman',
  };
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.communicationForm = this._FormBuilder.group({
      sendTo: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.communicationForm.controls }
  handleSubmit = () => {
    let postObj = {
      ...this.communicationForm.value
    }
    prompt('postObj', JSON.stringify(postObj))
  }
}
