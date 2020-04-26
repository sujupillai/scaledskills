import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  refCode;
  constructor(
    private router: Router,
    private _AuthenticationService: AuthenticationService, private _ActivatedRoute: ActivatedRoute
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._AuthenticationService.currentUserValue;
    this.refCode = null;
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.refCode = params.refCode
    });
    let returnUrl = window.location.pathname;
    localStorage.setItem('returnurl', returnUrl);
    if (currentUser) {
      return true;
    }
    // this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    if (this.refCode) {
      this.router.navigate(['/auth/login'], { queryParams: { refCode: this.refCode } })
    } else {
      this.router.navigate(['/auth/login']);
    }
    // this.router.navigate(['/auth/login']);
    return false;
  }
}