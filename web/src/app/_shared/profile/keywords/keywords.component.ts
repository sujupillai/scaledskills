import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html'
})
export class KeywordsComponent implements OnInit {
  keywordForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordList = [];
  constructor(private _FormBuilder: FormBuilder) { }
  ngOnInit() {
  }
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
    prompt('keywordList', JSON.stringify(this.keywordList))
  }
}
