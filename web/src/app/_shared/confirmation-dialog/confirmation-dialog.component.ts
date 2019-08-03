import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  dialogConfig: any = {}
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (!this.data.isActions) {
      setTimeout(() => {
        this.autoClose()
      }, 3000);
    }
  }
  handleeAction(res): void {
    this.dialogRef.close(res);
  }
  autoClose = () => {
    this.dialogRef.close(false);
  }


}
