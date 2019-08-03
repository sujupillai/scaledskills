import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-training-basics',
  templateUrl: './training-basics.component.html',
  styleUrls: ['./training-basics.component.scss']
})
export class TrainingBasicsComponent implements OnInit {
  trainingBasicForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback: any): void => {
    this.trainingBasicForm = this._FormBuilder.group({
      trainingName: ['', Validators.required],
      trainingUrl: ['', Validators.required],
      trainingFor: ['', Validators.required],
      organization: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      timeZone: ['', Validators.required],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.trainingBasicForm.controls }
  handleSubmit = () => {
    let postData = {
      ...this.trainingBasicForm.value
    }
    prompt('postData', JSON.stringify(postData))
  }

}
