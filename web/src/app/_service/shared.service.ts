import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }
  activeLoader = new Subject<boolean>();

  show() {
    this.activeLoader.next(true);
  }
  hide() {

    this.activeLoader.next(false);
  }
}
