import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TitleService } from './title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(private titleService: TitleService) { }


  ngAfterViewInit() {
    //this.titleService.init();
  }
}
