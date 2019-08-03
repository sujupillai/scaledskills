import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-training-settings',
  templateUrl: './training-settings.component.html',
  styleUrls: ['./training-settings.component.scss']
})
export class TrainingSettingsComponent implements OnInit {
  trainingSettingForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }
  optionArray=[];
  ngOnInit() {
    this.createForm(()=>{})
  }
  createForm = (callback) => {
    this.trainingSettingForm = this._FormBuilder.group({
      customQuestions: false,
      remainingTickets: false,
      setReminder: false,
      affiliatePromoterLink: false,
      trainingId: false,
      pageViews: false,
      interestedUsers: false,
      registeredUsers: false,
      addToCalendar: false,
      xSpotsLeft: false,
      comments: false,
      feedback: false,
      aboutOrganizer: false,
      moreEventsFromSameOrganizer: false,
    })
    if(callback){
      callback()
    }
  }

}
