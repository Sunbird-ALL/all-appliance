import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly SESSION_TIMEOUT = 1 * 60 * 1000; // 30 minutes in milliseconds
  private readonly WARNING_TIME = 10 * 1000; // 10 seconds warning
  private readonly SESSION_START_KEY = 'sessionStartTime';
  private sessionTimer$ = new BehaviorSubject<number>(0);
  private showWarning$ = new BehaviorSubject<boolean>(false);
  private timerInterval: any;
  private warningShown = false;

  constructor(private router: Router) {
    // Check session on service initialization (handles page refresh)
    this.initializeSession();
  }

  private initializeSession() {
    const sessionStart = localStorage.getItem(this.SESSION_START_KEY);
    if (sessionStart) {
      const currentTime = Date.now();
      const startTime = parseInt(sessionStart);
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= this.SESSION_TIMEOUT) {
        // Session has expired, clear everything
        this.endSession();
      } else {
        // Session is still valid, start the timer
        this.warningShown = false;
        this.showWarning$.next(false);
        this.startSessionTimer();
      }
    }
  }

  public startSession() {
    // Set session start time
    localStorage.setItem(this.SESSION_START_KEY, Date.now().toString());
    this.warningShown = false;
    this.showWarning$.next(false);
    this.startSessionTimer();
  }

  private startSessionTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      const remainingTime = this.getRemainingTime();
      this.sessionTimer$.next(remainingTime);

      // Show warning when the threshold is reached
      if (remainingTime <= (this.WARNING_TIME / 1000) && !this.warningShown) {
        this.warningShown = true;
        this.showWarning$.next(true);
      }

      // End session when time is up
      if (remainingTime <= 0) {
        this.endSession();
      }
    }, 1000);
  }

  public getRemainingTime(): number {
    const sessionStart = localStorage.getItem(this.SESSION_START_KEY);
    if (!sessionStart) return 0;

    const currentTime = Date.now();
    const startTime = parseInt(sessionStart);
    const elapsedTime = currentTime - startTime;
    const remainingTime = Math.max(0, this.SESSION_TIMEOUT - elapsedTime);

    return Math.ceil(remainingTime / 1000); // Convert to seconds
  }

  public getSessionTimer(): Observable<number> {
    return this.sessionTimer$.asObservable();
  }

  public getShowWarning(): Observable<boolean> {
    return this.showWarning$.asObservable();
  }

  public isSessionValid(): boolean {
    const sessionStart = localStorage.getItem(this.SESSION_START_KEY);
    if (!sessionStart) return false;

    const currentTime = Date.now();
    const startTime = parseInt(sessionStart);
    const elapsedTime = currentTime - startTime;

    return elapsedTime < this.SESSION_TIMEOUT;
  }

  public endSession() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    // Hide the warning popup
    this.showWarning$.next(false);
    this.warningShown = false;

    localStorage.removeItem(this.SESSION_START_KEY);
    localStorage.removeItem('apiToken');
    localStorage.removeItem('profileName');
    localStorage.removeItem('contentSessionId');
    
    console.log('Your session has expired. Please log in again.');
    this.router.navigate(['/login']);
  }
} 