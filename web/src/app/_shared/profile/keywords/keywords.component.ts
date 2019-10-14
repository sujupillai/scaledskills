import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html'
})
export class KeywordsComponent implements OnInit {
  keywordForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }
  ngOnInit() {
  }


  handleSubmit = () => {

  }
}
