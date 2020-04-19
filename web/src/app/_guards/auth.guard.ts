import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _AuthenticationService: AuthenticationService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._AuthenticationService.currentUserValue;
    if (currentUser) {
      return true;
    }
    // this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    this.router.navigate(['/auth/login']);
    return false;
  }
}