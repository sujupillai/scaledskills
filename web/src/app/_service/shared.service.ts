import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
