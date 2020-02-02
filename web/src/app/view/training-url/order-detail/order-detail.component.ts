import { Component, OnInit } from '@angular/core';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, SharedService } from '../../../_service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
  urlString: string = '';
  orderDetail = null;
  constructor(private _ActivatedRoute: ActivatedRoute, private _HttpService: HttpService,
    private _Router: Router, private _SharedService: SharedService) { }
  ngOnInit() {
    let url = ApiPath.orderDetail;
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.urlString = param.orderId;
      url = url.replace('{orderId}', this.urlString.toString())
      this.fetchOrderDetail(url)
    });
  }
  fetchOrderDetail = (url) => {
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.orderDetail = res['result']
    })
  }
  _httpOrder = (orderAppId) => {
    let url = ApiPath.placeOrder;
    url = url.replace('{orderId}', this.urlString.toString())
    this._HttpService.httpCall(url, 'POST', orderAppId, null).subscribe(res => {
      if (res && res.responseCode == 406) {
        /* server side validation mesages */
        let msgArray = [
          { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Message')
      } else if (res && res.responseCode == 200) {
        /* success  */
        let msgArray = [
          {
            mgs: 'Your booking has been confirmed. Check your email for detials.',
            class: 'confirmMsg'
          },
        ]
        this._SharedService.dialogConfig(msgArray, true, true, false, 'OK', null, false, 'Sucess').subscribe(res => {
          let returnUrl = localStorage.getItem('returnurl') || '/';
          this._Router.navigate([returnUrl]);
        })
      } else {
        /* any other error */
        let msgArray = [
          { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
      }
    }, error => {
      let msgArray = [
        { mgs: error['message'] ? error['message'] : 'Server Error', class: 'confirmMsg' },
      ]
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
    })
  }
  paymenMsg = () => {
    let msgArray = [
      {
        mgs: 'Sorry for the inconvenience, our payment integration system is on maintenance mode.', class: 'confirmMsg'
      },
      {
        mgs: `<p>Kindly do the payment in the below company details and call @ +919599350701 for confirmation. Once payment is verified by Scaled Skills Team, your name will be listed under registered users in training page.</p>
      <p><strong>Bank Name</strong> : ICICI Bank</p>
      <p><strong>Account Holder's name</strong> : SCALED SKILLS</p>
      <p><strong>Account Number</strong> : 061005003883</p>
      <p><strong>IFSC Code</strong> : ICIC0000610</p>
      <p><strong>UPI</strong> : scaledskills@icici</p>
      <p><strong>Pan</strong> : APJPJ2150A</p>
      <p><strong>GST</strong>  : 07APJPJ2150A1ZH </p>`, class: 'subMsg'
      },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, false, 'OK', null, false, 'Sucess').subscribe(res => {
      let returnUrl = localStorage.getItem('returnurl') || '/';
      this._Router.navigate([returnUrl]);
    })
  }
  handleSubmit = (orderAppId) => {
    let msgArray = [
      { mgs: 'Do you want to confirm your booking ?', class: 'confirmMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Information').subscribe(res => {
      if (res) {
        if (this.orderDetail.items[0].totalPrice > 0) {
          this.paymenMsg();
        } else {
          this._httpOrder(orderAppId)
        }

      }
    })
  }
}
