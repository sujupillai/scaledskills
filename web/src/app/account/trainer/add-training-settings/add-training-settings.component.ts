import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-add-training-settings',
  templateUrl: './add-training-settings.component.html'
})
export class AddTrainingSettingsComponent implements OnInit {
  trainingSettingForm: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }
  optionArray = [];
  ngOnInit() {
    this.createForm(() => { })
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
    if (callback) {
      callback()
    }
  }
}
