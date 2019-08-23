import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-add-training-feedback',
  templateUrl: './add-training-feedback.component.html'
})
export class AddTrainingFeedbackComponent implements OnInit {
  traineeReviewForm: FormGroup
  constructor(private _FormBuilder: FormBuilder) { }
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.traineeReviewForm = this._FormBuilder.group({
    })
  }
}
