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
  handleSubmit = (orderAppId) => {
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
          let returnUrl = localStorage.getItem('returnurl')  || '/';
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
        { mgs: error['error'] ? error['error'] : 'Something went wrong', class: 'confirmMsg' }
      ]
      this._SharedService.dialogConfig(msgArray, false, false, false, null, null, false, 'Error')
    })
  }
}
