import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-session-timer',
  templateUrl: './session-timer.component.html',
  styleUrls: ['./session-timer.component.css']
})
export class SessionTimerComponent implements OnInit, OnDestroy {
  remainingTime: number = 0;
  private sessionTimerSubscription: Subscription;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionTimerSubscription = this.sessionService.getSessionTimer().subscribe(
      (time) => {
        this.remainingTime = time;
      }
    );
  }

  ngOnDestroy() {
    if (this.sessionTimerSubscription) {
      this.sessionTimerSubscription.unsubscribe();
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
} 