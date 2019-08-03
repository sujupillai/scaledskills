import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../../_service';
import { first } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../_shared/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.createForm(() => {

    })
  }
  createForm = (callback) => {
    this.registerForm = this._FormBuilder.group(
      {
        "firstName": ['', Validators.required],
        "lastName": ['', Validators.required],
        "email": ['', Validators.required],
        "phoneNumber": ['', Validators.required],
        "userName": '',
        "password": ['', Validators.required],
        "id": 0
      }
    )
    if (callback) {
      callback()
    }

  }
  get formControl() { return this.registerForm.controls }

  handleSubmitForm = () => {
    let data = {
      ...this.registerForm.value,
      userName: this.formControl.email.value
    };
    if (this.registerForm.valid) {
      let url = 'Account'
      this._HttpService.httpCall(url, 'POST', data, null).pipe(first()).subscribe(res => {
        console.log(res)
      })
    }

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        'yesText': 'Yes',
        'noText': 'No',
        'isyes': true,
        'isNo': true,
        'message': 'Welcome',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }


    });
  }

}
