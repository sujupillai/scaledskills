import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../_service';
import { first } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../_shared/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _Router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.createForm(() => {

    })
  }
  createForm = (callback: any): void => {
    this.registerForm = this._FormBuilder.group(
      {
        "firstName": ['', Validators.required],
        "lastName": ['', Validators.required],
        "email": ['', Validators.required],
        "phoneNumber": ['', Validators.required],
        "userName": '',
        "password": ['', Validators.required],
        "confirmPassword": ['', Validators.required],
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
        if (res) {
          this.openDialog()
        }
      })

    }

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        'yesText': 'Yes',
        'noText': 'No',
        'isYes': true,
        'isNo': true,
        'isActions': false,
        'message': 'Registration successfull',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this._Router.navigate(['/auth']);
    });
  }
}
