import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {
  requestForm: FormGroup;
  cars: Array<any>;

  cols: any[];
  trainingNeedDDL = []
  constructor(private _FormBuilder: FormBuilder) {
    this.trainingNeedDDL = [
      { name: 'Optoiin 1', code: '1' },
    ]
  }
  ngOnInit() {
    this.createForm(() => { })
    this.cars = [
      { field: 'Header1', header: 'Header1' },
      { field: 'Header2', header: 'Header2' },
      { field: 'Header3', header: 'Header3' },
    ]


    this.cols = [
      { field: 'Header1', header: 'Header1' },
      { field: 'Header2', header: 'Header2' },
      { field: 'Header3', header: 'Header3' },
      { field: 'Header2', header: 'Header2' }
    ];
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

  }
}
