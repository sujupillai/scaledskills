import { Injectable, NgZone } from '@angular/core';
import { DialogService } from 'primeng/api';
import { ConfirmationDialogComponent } from '../_shared/confirmation-dialog/confirmation-dialog.component'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(public dialogService: DialogService) { }
  activeLoader = new Subject<boolean>();
  show() {
    this.activeLoader.next(true);
  }
  hide() {
    this.activeLoader.next(false);
  }
  openDialog = (dialogConfig, dialogHeader) => {
    return this.dialogService.open(ConfirmationDialogComponent, {
      data: {
        ...dialogConfig
      },
      header: dialogHeader,
      width: '50%'
    });
  }
  dialogConfig = (mesage, isAction, isYes, isNo, yesText, noText, autoClose, header) => {
    let tempRes;
    let dialogConfig = {
      message: mesage,
      isAction: isAction,
      isYes: isYes,
      isNo: isNo,
      yesText: yesText,
      noText: noText,
      autoClose: autoClose
    };
    let dialogHeader = header;
    let ref = this.openDialog(dialogConfig, dialogHeader);
    return ref.onClose;
  }
}
