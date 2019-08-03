import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {
  socialForm:FormGroup;
  constructor(private _FormBuilder:FormBuilder) { }

  ngOnInit() {
    this.createForm(()=>{})
  }
  createForm=(callback)=>{
    this.socialForm=this._FormBuilder.group({
      'website':'',
      'linkedIn':'',
      'facebook':'',
      'twitter':'',
    })
    if(callback){
      callback()
    }
  }
  handleSubmit=()=>{
    let  postObj={
      ...this.socialForm.value
    }
    prompt('postObj',JSON.stringify(postObj))
  }

}
