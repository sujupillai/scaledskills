import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from '../../_service/shared.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {
  debugger;
  activeLoader: Subject<boolean> = this._SharedService.activeLoader;
  constructor(private _SharedService: SharedService) {
  }
  ngOnInit() {
  }
}
