import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {
  requestForm: FormGroup;

  trainingNeedDDL = []
  constructor(private _FormBuilder: FormBuilder) {
    this.trainingNeedDDL = [
      { name: 'Optoiin 1', code: '1' },
    ]
  }
  ngOnInit() {
    this.createForm(() => { })
  }
  createForm = (callback) => {
    this.requestForm = this._FormBuilder.group({
      reportName: ['', Validators.required],
      trainingType: ['', Validators.required],
      search: ['', Validators.required],
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
