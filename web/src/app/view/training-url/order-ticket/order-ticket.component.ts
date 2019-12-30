import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, AuthenticationService, SharedService } from '../../../_service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-order-ticket',
  templateUrl: './order-ticket.component.html'
})
export class OrderTicketComponent implements OnInit {
  urlString: string = '';
  ticketList = []
  selectedTickets = [];
  orderId = 'ORD-1229-TL-000000005';
  constructor(private _location: Location, private _ActivatedRoute: ActivatedRoute, private _HttpService: HttpService, private _SharedService: SharedService, private _Router: Router) { }

  ngOnInit() {

    let url = ApiPath.trainingTicket;
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.urlString = param.url;
      url = url.replace('{TrainingId}', this.urlString.toString())
      this.fetchTickets(url)
    });
  }
  fetchTickets = (url) => {
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res && res['responseCode'] == 200) {
        this.ticketList = res.result;
        this.ticketList.map((x) => {
          x.orderQty = 0;
          x.isAdded = false;
        })
      }
    })
  }
  handleQty = (type, item) => {
    if (type == 1) {
      item.orderQty = item.orderQty - 1
    } else {
      item.orderQty = item.orderQty + 1
    }
  }
  onBlurMethod = (item) => {
    if (!item.orderQty) {
      item.orderQty = item.minBooking
    } else if (item.orderQty > item.qty) {
      item.orderQty = item.qty
    } else if (item.orderQty < item.minBooking) {
      item.orderQty = item.minBooking
    }
  }
  addItem = (item) => {
    item.isAdded = !item.isAdded;
    this.selectedTickets = this.ticketList.filter(x => x.isAdded);
  }
  orderItem = () => {
    let tempItem = [];
    let selectedTickets = [];
    this.ticketList.filter((x) => {
      if (x.isAdded) {
        selectedTickets.push({
          "item": {},
          "itemId": x.id,
          "qty": x.qty,
          "unitPrice": x.paymentCharge,
          "totalPrice": x.paymentCharge * x.qty
        })
      }
    });
    tempItem = selectedTickets;
    return tempItem
  }
  backClicked=()=> {
    let returnUrl = localStorage.getItem('returnurl')  || '/';
    this._Router.navigate([returnUrl]);
    // this._location.back();
  }
  handleSubmit = () => {
    let postObj = {
      "orderAppId": "",
      "address": "",
      "description": "",
      "totalAmount": 0,
      "items": this.orderItem()
    }
    if (postObj.items.length > 0) {
      let url = ApiPath.orderTicket
      this._HttpService.httpCall(url, 'POST', postObj, null).subscribe(res => {
        if (res && res.responseCode == 406) {
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Message')
        } else if (res && res.responseCode == 200) {
          /* success  */
          this.orderId = res['result']
          let msgArray = [
            {
              mgs: res && res.responseMessege ? res.responseMessege+' Now you can check your ordetail' : 'Order generated successfully. Now you can check your ordetail.',
              class: 'confirmMsg'
            },
          ]
          this._SharedService.dialogConfig(msgArray, true, true, false, 'OK', null, false, 'Sucess').subscribe(res => {
            this._Router.navigate(['/orderDetail', this.orderId])
          })
        } else {
          /* any other error */
          let msgArray = [
            { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
          ]
          this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Error')
        }
      })
    }
  }
}
