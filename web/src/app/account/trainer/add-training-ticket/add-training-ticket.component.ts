import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service'
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-training-ticket',
  templateUrl: './add-training-ticket.component.html',
  styles: [`
        @media screen and (max-width: 40em) {
            :host ::ng-deep .ui-dialog {
                width: 75vw !important;
            }
        }
    `]
})
export class AddTrainingTicketComponent implements OnInit {
  formElement: FormGroup;
  ticketId = 0;
  paymentDetails = [];
  paymentBreakup:null;
  countryList = [];
  display: boolean;
  stateList = [];
  trainingBasicData = null;
  curentYear = (new Date()).getFullYear();
  submitted: boolean = false;
  trainingId = 0;
  ticektSaleMaxDate;
  addTicketForm = false;
  defaultList = [{
    "text": "Free",
    "value": "1",
  }];
  selectedTicketType = [];
  ticketTypeList = [{
    "text": "Free",
    "value": "1",
  },
  {
    "text": "Paid",
    "value": "2",
  }
  ];
  prevState;
  settings;
  startDate = new FormControl();
  endDate = new FormControl();
  trainingData = [];
  displayNoRecord = false;
  msgForAtendee = '';
  description: '';
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
  ngOnInit() {
    this._ActivatedRoute.parent.params.subscribe((param: any) => {
      this.trainingId = param.id;
      if (this.trainingId == 0) {
        let msgArray = [
          { mgs: 'Sorry! You have to create a training first', class: 'confirmMsg' },
        ]
        this._SharedService.dialogConfig(msgArray, true, true, false, 'OKAY', 'CANCEL', false, 'Alert').subscribe(res => {
          if (res == 1) {
            this._Router.navigate(['account/trainer/training/0/basic']);
          }
        })
        return
      } else {
        this.getData()
      }
    });
    this.getTrainingData(this.trainingId)
    this.createForm(() => {
      this.settings = { singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items' };
      this.selectedTicketType = this.defaultList;
      this.startDate.setValue('');
      this.endDate.setValue('');
      this.getCountryList();
    })
  }
  createForm = (callback) => {
    this.formElement = this._FormBuilder.group({
      name: ['', Validators.required],
      qty: ['', Validators.required],
      minBooking: ['1', [Validators.required, Validators.min(1)]],
      maxBooking: [''],
      ticketType: [1, [Validators.required, Validators.min(1)]],
      ticketTypeObj: [''],
      paymentCharge: ['0', [Validators.required]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: [''],
      msgForAtendee: [''],

      id: 0
    })
    if (callback) {
      callback()
    }
  }
  get formControl() { return this.formElement.controls };

  getTrainingData = (id) => {
    let url = ApiPath.getTraining
    url = url.replace('{id}', id)
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.result) {
        this.trainingBasicData = res.result;
        this.ticektSaleMaxDate = new Date(this.trainingBasicData.endDate);
      }
    })
  }
  ticketPreview = () => {
    let url = ApiPath.ticketPreview;
    let data ={
      "totalAmount": this.formControl.paymentCharge.value,
      "paymentDetails": this.paymentDetails
    }
  
    this._HttpService.httpCall(url, 'POST', data, null).subscribe(res => {
      this.paymentBreakup=res.result
    })
  }
  getMaster = (url, masterCollection) => {
    this._HttpService.httpCall(url, 'GET', null, null).pipe(first()).subscribe(res => {
      if (res.responseCode == 200) {
        this[masterCollection] = res.result
      }
    })
  }
  getCountryList = () => {
    let url = ApiPath.globalCountry;
    this.getMaster(url, 'countryList')
  }
  getStateList = (id) => {
    const url = ApiPath.globalState + '/' + id;
    this.getMaster(url, 'stateList')
  }
  onTypeChange(event) {
    this.formControl['ticketType'].setValue(event.value)
    if (event.value == 1) {
      this.formControl['paymentCharge'].setValue(0)
    } else {
      this.getTicketFee()
    }
  }
  getTicketFee = () => {
    let url = ApiPath.ticketFee;
    url = url.replace('{ticketId}', this.ticketId.toString())
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res.responseCode == 200) {
        this.paymentDetails = res.result;
      } else {
        this.paymentDetails = []
      }
    })
  }
  OnItemDeSelect(item: any) {
    this.formControl['ticketType'].setValue('')
  }
  getData = () => {
    this.displayNoRecord = false;
    let url = ApiPath.trainingTicket;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.displayNoRecord = true;
      this.trainingData = res.result;
    })
  }
  resetForm(formGroup: FormGroup, addTicketForm) {
    this.submitted = false;
    let id = this.formControl.id.value;
    if (id > 0) {
      Object.keys(this.prevState).forEach(name => {
        if (this.formControl[name]) {
          this.formControl[name].setValue(this.prevState[name]);
        }
      });
      this.setDate(this.prevState)
      this.setDropdown(this.prevState)
      this.addTicketForm = false
    } else {
      let control: AbstractControl = null;
      formGroup.reset();
      formGroup.markAsUntouched();
      Object.keys(formGroup.controls).forEach((name) => {
        control = formGroup.controls[name];
        control.setErrors(null);
      });
      this.selectedTicketType = this.defaultList;
      this.startDate.setValue(new Date());
      this.endDate.setValue(new Date());
      this.addTicketForm = addTicketForm
    }
  }
  setDate = (dataObj) => {
    this.startDate.setValue(new Date(dataObj.startDate));
    this.formControl.startDate.setValue(dataObj.startDate);
    this.endDate.setValue(new Date(dataObj.endDate));
    this.formControl.endDate.setValue(dataObj.endDate);
  }
  setDropdown = (dataObj) => {
    var ticketTypeObj = this.ticketTypeList.filter(x => x.value == dataObj.ticketType)
    this.selectedTicketType = ticketTypeObj;
    this.formControl['ticketTypeObj'].setValue(ticketTypeObj);
  }
  editTrainingTicket = (id) => {
    let url = ApiPath.trainingTicket;
    url = url.replace('{TrainingId}', this.trainingId.toString()) + '/' + id
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.prevState = res.result;
      this.addTicketForm = true;
      let dataObj = res.result;
      this.description = dataObj.description;
      this.msgForAtendee = dataObj.msgForAtendee;
      this.ticketId = dataObj.id
      Object.keys(dataObj).forEach(name => {
        if (this.formControl[name]) {
          if (name != 'address') {
            this.formControl[name].setValue(dataObj[name]);
          }
        }
      });
      this.setDate(dataObj)
      this.setDropdown(dataObj)
    })
  }
  handleCancel = () => {
    let msgArray = [
      { mgs: 'Are you sure, you want to cancel ?', class: 'confirmMsg' },
      { mgs: 'Unsaved changes will not be saved.', class: 'subMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Sucess').subscribe(res => {
      if (res == 1) {
        this.resetForm(this.formElement, null)
      }
    })
  }
  handleSubmit = () => {
    this.submitted = true;
    let url = ApiPath.trainingTicket;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    this.formControl.startDate.setValue(this.startDate.value ? this.startDate.value : '');
    this.formControl.endDate.setValue(this.endDate.value ? this.endDate.value : '');
    let postObj = {
      ...this.formElement.value
    }
    postObj.description = this.description;
    postObj.msgForAtendee = this.msgForAtendee;
    if (this.formElement.valid) {
      this.submitted = false;
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res.responseCode == 200) {
          let msgArray = [
            { mgs: res.responseMessege ? res.responseMessege : 'Success', class: 'confirmMsg' },
            { mgs: 'Do you want to create another ticket?.', class: 'subMsg' },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'NO', false, 'Sucess').subscribe(res => {
            if (res == 1) {
              this.resetForm(this.formElement, true)
            } else {
              this.resetForm(this.formElement, false)
              this.getData()
            }
          })
        }
        else {
          let msgArray = [
            { mgs: 'Something went wrong', class: 'confirmMsg' }
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
          this.resetForm(this.formElement, false)
        }
      },
        error => {
          let msgArray = [
            { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
        });
      this.resetForm(this.formElement, true)
    } else {
      let msgArray = [
        { mgs: 'Please complete form', class: 'confirmMsg' },
      ]
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      this.submitted = true;
    }
  }

  showDialog() {
    this.display = true;
  }
}
