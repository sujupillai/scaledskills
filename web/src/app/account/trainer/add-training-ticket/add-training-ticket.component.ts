import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service'
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-training-ticket',
  templateUrl: './add-training-ticket.component.html'
})
export class AddTrainingTicketComponent implements OnInit {
  formElement: FormGroup;
  countryList = [];
  stateList = [];
  submitted: boolean = false;
  trainingId = 0;
  addTicketForm = true;
  defaultList = [{
    "text": "Free",
    "value": "1",
  }];
  selectedTicketType = [];
  ticketTypeList = [{
    "text": "Free",
    "value": "1",
  }, {
    "text": "Paid",
    "value": "2",
  }];
  prevState;
  settings;
  startDate = new FormControl();
  endDate = new FormControl();
  trainingData = [];
  displayNoRecord = false;
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
    this.createForm(() => {
      this.settings = { singleSelection: true, text: "Select", labelKey: "text", primaryKey: "value", noDataLabel: 'No items' };
      this.selectedTicketType = this.defaultList;
      this.startDate.setValue(new Date());
      this.endDate.setValue(new Date());
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
    }
  }
  OnItemDeSelect(item:any){
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
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error');
          this.resetForm(this.formElement, false)
        }
      },
        error => {
          let msgArray = [
            { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
          ]
          // dialogConfig(mesage, isAction, isYes, isNo, yesText, noText, autoClose, header)
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        });
      this.resetForm(this.formElement, true)
    } else {
      let msgArray = [
        { mgs: 'Please complete form', class: 'confirmMsg' },
      ]
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
      this.submitted = true;
    }
  }
}
