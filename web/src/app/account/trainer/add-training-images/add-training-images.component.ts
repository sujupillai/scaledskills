import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-training-images',
  templateUrl: './add-training-images.component.html'
})
export class AddTrainingImagesComponent implements OnInit {
  uploadedFiles: any[] = [];
  constructor() { }

  ngOnInit() {
  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }


  }

}
