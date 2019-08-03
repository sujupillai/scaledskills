import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-training-location',
  templateUrl: './training-location.component.html',
  styleUrls: ['./training-location.component.scss']
})
export class TrainingLocationComponent implements OnInit {
  trainingLocationForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.trainingLocationForm = this._FormBuilder.group({
      location: ['', Validators.required]
    })
    if (callback) {
      callback()
    }
  }
  get formControl(){return this.trainingLocationForm.controls};
  handleSubmit = () => {
    let postData = {
      ...this.trainingLocationForm.value
    }
    prompt('postData', JSON.stringify(postData))
  }

}
