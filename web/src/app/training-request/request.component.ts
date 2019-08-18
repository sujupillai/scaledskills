import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordList = [];
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
      participant: [''],
      description: ['', Validators.required],
      address: this._FormBuilder.group({
        city: [''],
        zipCode: [''],
        street: [''],
        countryId: [''],
        stateId: [''],
      }),
      budget: [''],
      keywords: [''],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.requestForm.controls }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.keywordList.push({ name: value.trim() });
    }
    if (input) {
      input.value = '';
    }
  }
  remove(item): void {
    const index = this.keywordList.indexOf(item);
    if (index >= 0) {
      this.keywordList.splice(index, 1);
    }
  }
  handleSubmit = () => {
    let postObj = {
      ...this.requestForm.value
    }
    prompt('postObj', JSON.stringify(postObj))
  }
}
