import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-certifications-earned',
  templateUrl: './certifications-earned.component.html',
  styleUrls: ['./certifications-earned.component.scss']
})
export class CertificationsEarnedComponent implements OnInit {
  profileForm:FormGroup
  constructor( private _FormBuilder:FormBuilder) { }

  ngOnInit() {
  }
  createForm=(callback)=>{
    this.profileForm=this._FormBuilder.group({

    })
    if(callback){
      callback()
    }
  }

}
