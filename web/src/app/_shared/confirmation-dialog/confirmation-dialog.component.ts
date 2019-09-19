import { Component, Inject, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/api';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }
  data;
  ngOnInit() {
    this.data = this.config.data
    if (this.data.autoClose) {
      setTimeout(() => {
        this.ref.close(null);
      }, 3000)
    }
  }
  handleClick = (data) => {
    this.ref.close(data);
  }

}
