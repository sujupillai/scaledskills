import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service'
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-organization-bank-detail',
  templateUrl: './organization-bank-detail.component.html'
})
export class OrganizationBankDetailComponent implements OnInit {
  orgBankDetailForm: FormGroup;
  uploadedFiles: any[] = [];
  uplo: File;
  submitted: boolean = false;
  documentUpload: string = ''
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService) { }
  ngOnInit() {
    this.createForm(() => {
      this.documentUpload = this._HttpService.apiUrlName() + ApiPath.documentUpload;
      this.getBankDetail()
    })
  }
  createForm = (callback) => {
    this.orgBankDetailForm = this._FormBuilder.group({
      name: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      gstNum: ['', Validators.required],
      exemptionDocId: ['638593b0-f1b9-4964-a56e-70b6bf6ee975', Validators.required],
      panCardDocId: ['638593b0-f1b9-4964-a56e-70b6bf6ee975', Validators.required],
      adharCardDocId: ['', Validators.required],
      cancellationDocId: ['', Validators.required],
      exemptionDocUrl: ['638593b0-f1b9-4964-a56e-70b6bf6ee975', Validators.required],
      panCardDocUrl: ['638593b0-f1b9-4964-a56e-70b6bf6ee975', Validators.required],
      adharCardDocUrl: ['638593b0-f1b9-4964-a56e-70b6bf6ee975', Validators.required],
      cancellationDocUrl: ['638593b0-f1b9-4964-a56e-70b6bf6ee975', Validators.required],
      id: ['', Validators.required],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.orgBankDetailForm.controls }
  onDrop(event: any) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    // your code goes here after droping files or any
  }
  onDragOver(evt) {
    alert('1')
    console.log(evt);
    evt.preventDefault();
    evt.stopPropagation();
  }
  onDragLeave(evt) {
    alert('2')
    console.log(evt);
    evt.preventDefault();
    evt.stopPropagation();
  }
  upload(event) {
    debugger
    alert('3')
    console.log(event)
    alert(event.files)
  }
  onUpload(event) {
    for (let file of event.files) {
      this.uplo = file;
    }
    this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    prompt('this.uplo', JSON.stringify(this.uplo))
    this._HttpService.httpCall('Document/Upload', 'POST', this.uplo, null).subscribe(res => {
      debugger
    })

  }
  getBankDetail = () => {
    let url = ApiPath.userBasic;
    this._HttpService.httpCall(url, 'GET', null, null).pipe(first()).subscribe(res => {
      if (res.responseCode == 200) {
        let dataObj = res.result;
        Object.keys(dataObj).forEach(name => {
          if (this.formControl[name]) {
            this.formControl[name].setValue(dataObj[name]);
          }
        });
      } else {
        let msgArray = [
          { mgs: 'Something went wrong', class: 'confirmMsg' }
        ]
        // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
      }
    }, error => {
      let msgArray = [
        { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
      ]
      // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
    });
  }
  handleSubmit = () => {
    if (this.orgBankDetailForm.invalid) {
      this.submitted = true;
      let msgArray = [
        { mgs: 'Please complete form', class: 'confirmMsg' },
      ]
      // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
    } else {
      let url = ApiPath.userBasic;
      let postObj = {
        ...this.orgBankDetailForm.value
      }

      this._HttpService.httpCall(url, 'PUT', postObj, null).subscribe(res => {
        if (res.result) {
          let msgArray = [
            {
              mgs: res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess');
          this.getBankDetail()
        } else {
          let msgArray = [
            { mgs: res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        }
      }, error => {
        let msgArray = [
          { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
        ]
        // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
      })
    }
  }
}
