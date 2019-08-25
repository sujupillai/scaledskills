import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-add-training-tags',
  templateUrl: './add-training-tags.component.html'
})
export class AddTrainingTagsComponent implements OnInit {
  traineeTagForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }
  ngOnInit() {
  }
  handleSubmit = () => {
    // prompt('keywordList',JSON.stringify(this.keywordList))
  }
}
