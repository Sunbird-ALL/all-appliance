import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  canActivate(): boolean {
    // Check if user is authenticated and session is valid
    const isAuthenticated = !!localStorage.getItem('virtualId');
    const isSessionValid = this.sessionService.isSessionValid();

    if (isAuthenticated && isSessionValid) {
      return true;
    } else {
      // End session and redirect to login
      this.sessionService.endSession();
      return false;
    }
  }
}
