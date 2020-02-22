import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-organization-bank-detail',
  templateUrl: './organization-bank-detail.component.html'
})
export class OrganizationBankDetailComponent implements OnInit {
  formElement: FormGroup;
  uploadedFiles: any[] = [];
  uplo: File;
  submitted: boolean = false;
  fileData = null;
  documentUpload: string = ''
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private http: HttpClient, private _Router: Router) { }
  ngOnInit() {
    this.createForm(() => {
      this.documentUpload = this._HttpService.apiUrlName() + ApiPath.documentUpload;
      this.getBankDetail()
    })
  }
  createForm = (callback) => {
    this.formElement = this._FormBuilder.group({
      name: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      branchName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      gstNum: [''],
      exemptionDocId: [''],
      panCardDocId: [''],
      adharCardDocId: [''],
      cancellationDocId: [''],
      exemptionDocUrl: [''],
      panCardDocUrl: [''],
      adharCardDocUrl: [''],
      cancellationDocUrl: [''],
      id: [''],
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.formElement.controls }
  getBankDetail = () => {
     let url= this._Router.url.indexOf('general/bank') >= 0?ApiPath.userBankDetail:ApiPath.organizationBankDetail;
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
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      }
    }, error => {
      let msgArray = [
        { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
      ]
      // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
    });
  }
  myUploader = (event, control) => {
    this.fileData = <File>event.files[0];
    let url = ApiPath.documentUpload
    const formData = new FormData();
    formData.append('file', this.fileData);
    this._HttpService.httpCall(url, 'POST', formData, null).subscribe(res => {
      this.formControl[control].setValue(res.result)

    })
  }
  handleSubmit = () => {
    debugger
    if (this.formElement.invalid) {
      this.submitted = true;
      let msgArray = [
        { mgs: 'Please complete form', class: 'confirmMsg' },
      ]
      // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
    } else {
      let url= this._Router.url.indexOf('general/bank') >= 0?ApiPath.userBankDetail:ApiPath.organizationBankDetail;
      let postObj = {
        ...this.formElement.value
      }
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res.result) {
          let msgArray = [
            {
              mgs: res.responseMessege ? res.responseMessege : 'Success',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Sucess').subscribe(res=>{
            this.getBankDetail()
          });
        } else {
          let msgArray = [
            { mgs: 'Something went wrong', class: 'confirmMsg' }
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        }
      }, error => {
        let msgArray = [
          { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
        ]
        // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      })
    }
  }
}
