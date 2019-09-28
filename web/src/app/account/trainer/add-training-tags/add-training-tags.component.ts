import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiPath } from '../../../_helpers/_constants/api'
import { HttpService, SharedService } from '../../../_service'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-add-training-tags',
  templateUrl: './add-training-tags.component.html'
})
export class AddTrainingTagsComponent implements OnInit {
  traineeTagForm: FormGroup;
  trainingTag = new FormControl()
  submitted: boolean = false;
  trainingId:0;
  constructor(private _FormBuilder: FormBuilder, private _SharedService: SharedService, private _HttpService: HttpService, private _ActivatedRoute:ActivatedRoute) { }
  ngOnInit() {
    this._ActivatedRoute.parent.params.subscribe((param: any) => {
      this.trainingId = param['id'];
      if (this.trainingId > 0) {
        this.getData()
      }else{
        alert('please create a training first')
      }
    });
  }

  getData = () => {
    const url = ApiPath.Organization;
    this._HttpService.httpCall(url, 'GET', null, null).subscribe(res => {
      prompt('res', JSON.stringify(res))
      let dataObj = res;
      this.trainingTag.setValue(dataObj && dataObj.name ? dataObj.name.split(",") : [])
    })
  }
  handleSubmit = () => {
    this.submitted = true;
    const url = ApiPath.Organization;
    let postData = this.trainingTag.value.toString();
    prompt('postData', JSON.stringify(postData))
    this._HttpService.httpCall(url, 'POST', postData, null).subscribe(res => {
      if (res.result) {
        let msgArray = [
          {
            mgs: res.responseMessege ? res.responseMessege : 'Success',
            class: 'confirmMsg'
          },
        ]
        this._SharedService.dialogConfig(msgArray, false, false, false, null, null, true, 'Sucess');
        this.getData()
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
}
