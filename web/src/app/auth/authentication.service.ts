import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './_models';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(url, data) {
    return this._HttpClient.post<any>(url, data)
      .pipe(map(user => {
        if (user && user.auth_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));

  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this._Router.navigate(['/auth/login']);
  }
}