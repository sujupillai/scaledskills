import { Component, OnInit } from '@angular/core';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { HttpService, SharedService, AuthenticationService } from '../../../_service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
  urlString: string = '';
  paymentUrl = ApiPath.placeOrder;
  orderDetail = null;
  orderSummaryData = null;
  constructor(private _ActivatedRoute: ActivatedRoute, private _HttpService: HttpService, public _AuthenticationService: AuthenticationService,
    private _Router: Router, private _SharedService: SharedService) { }
  ngOnInit() {
    let url = ApiPath.orderDetail;
    this._ActivatedRoute.params.subscribe((param: any) => {
      this.urlString = param.orderId;
      url = url.replace('{orderId}', this.urlString.toString())
      this.fetchOrderDetail(url);
      this.fetchOrderSummary();
      this.paymentUrl = this.paymentUrl.replace('{orderId}', this.urlString.toString())
    });
  }
  fetchOrderDetail = (url) => {
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.orderDetail = res['result'];
    })
  }
  fetchOrderSummary = () => {
    let url = ApiPath.ordersSummary;
    url = url.replace('{orderId}', this.urlString.toString())
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      this.orderSummaryData = res['result']
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
  postToExternalSite(orderAppId): void {
    let url = ApiPath.placeOrder;
    url = url.replace('{orderId}', this.urlString.toString())
    const origin = window.location.origin;
    let baseHref;
    if (origin.indexOf("localhost") > -1) {
      baseHref = 'http://testapi.scaledskills.com/';
    } else {
      baseHref = window.location.origin + '/';
    }
    const form = window.document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", baseHref + url);
    form.setAttribute("target", "_self");
    form.appendChild(this.createHiddenElement('orderAppId', orderAppId));
    window.document.body.appendChild(form);
    form.submit();
  }
  private createHiddenElement(name: string, value: string): HTMLInputElement {
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('name', name);
    hiddenField.setAttribute('value', value);
    hiddenField.setAttribute('type', 'hidden');
    return hiddenField;
  }
  handleSubmit = (orderAppId) => {
    let msgArray = [
      { mgs: 'Do you want to confirm your booking ?', class: 'confirmMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Information').subscribe(res => {
      if (res) {
        if (this.orderDetail.items[0].totalPrice > 0) {
          this.postToExternalSite(orderAppId);
          // this.paymenMsg();
        } else {
          this._httpOrder(orderAppId)
        }
      }
    })
  }


  _httpOrderCancel = (orderAppId) => {
    let url = ApiPath.orderCancel;
    url = url.replace('{orderId}', this.urlString.toString())
    this._HttpService.httpCall(url, 'POST', orderAppId, null).subscribe(res => {
      if (res && res.responseCode == 406) {
        let msgArray = [
          { mgs: res && res.responseMessege ? res.responseMessege : 'Something went wrong', class: 'confirmMsg' }
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Message')
      } else if (res && res.responseCode == 200) {
        let msgArray = [
          {
            mgs: 'Your booking has been canceled.',
            class: 'confirmMsg'
          },
        ]
        this._SharedService.dialogConfig(msgArray, true, true, false, 'OK', null, false, 'Sucess').subscribe(res => {
          let returnUrl = localStorage.getItem('returnurl') || '/';
          this._Router.navigate([returnUrl]);
        })
      } else {
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

  cancelOrder = (orderAppId) => {
    let msgArray = [
      { mgs: 'Are you sure to cancel your order ?', class: 'confirmMsg' },
    ]
    this._SharedService.dialogConfig(msgArray, true, true, true, 'YES', 'CANCEL', false, 'Information').subscribe(res => {
      if (res) {
        this._httpOrderCancel(orderAppId)
      }
    })
  }
  backToHome = () => {
    let returnUrl = localStorage.getItem('returnurl') || '/';
    this._Router.navigate([returnUrl]);
  }
}
