import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService, SharedService } from 'src/app/_service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath } from 'src/app/_helpers/_constants/api';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-training-final',
  templateUrl: './training-final.component.html',
})
export class TrainingFinalComponent implements OnInit {
  isPromotion: boolean = false;
  isAccept: boolean = false;
  submitted: boolean = false;
  entity = null;
  trainingId = 0;
  constructor(private _FormBuilder: FormBuilder, private _HttpService: HttpService, private _SharedService: SharedService,
    private _ActivatedRoute: ActivatedRoute, private _Router: Router) { }
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
        this.getData(this.trainingId)
      }
    });
  }
  getData = (id) => {
    let url = ApiPath.getTraining
    url = url.replace('{id}', id)
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      if (res.result) {
        this.entity = res.result;
      }
    })
  }
  handleSave = (status) => {
    let url = ApiPath.publish;
    url = url.replace('{TrainingId}', this.trainingId.toString())
    let data = {
      isPromotion: this.isPromotion,
      isAccept: this.isAccept,
      trainingId: this.trainingId,
      status: status
    }
    if (this.isAccept) {
      this._HttpService.httpCall(url, 'POST', data, null).subscribe(res => {
        if (res && res.responseCode == 200) {
          let msgArray = [
            { mgs: 'Training is published', class: 'confirmMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, true, true, false, 'OKAY', 'CANCEL', false, 'Alert').subscribe(res => {
            if (res == 1) {
              let val = window.location.origin + '/t/' + this.entity.url;
              window.open(val, "_blank");
            }
          })
        } else {
          let msgArray = [
            { mgs: res.responseMessege, class: 'confirmMsg' },
          ]
          this._SharedService.dialogConfig(msgArray, true, true, false, 'OKAY', 'CANCEL', false, 'Alert').subscribe(res => {
          })
        }
      })
    } else {
      this.submitted = true
    }
  }
  viewProfile() {
    let val = window.location.origin + '/t/' + this.entity.url;
    window.open(val, "_blank");
  }
}
