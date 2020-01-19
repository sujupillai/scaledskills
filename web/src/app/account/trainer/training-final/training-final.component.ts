import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService, SharedService } from 'src/app/_service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-training-final',
  templateUrl: './training-final.component.html',
})
export class TrainingFinalComponent implements OnInit {
  isPaidPromotions: boolean = false;
  isAggree: boolean = false;
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
      }
    });
  }
}
