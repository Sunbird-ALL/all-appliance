import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session-timer-demo',
  templateUrl: './session-timer-demo.component.html',
  styleUrls: ['./session-timer-demo.component.css']
})
export class SessionTimerDemoComponent implements OnInit {

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    // Start a demo session when the component loads
    this.sessionService.startSession();
  }

  startNewSession() {
    this.sessionService.startSession();
  }

  endSession() {
    this.sessionService.endSession();
  }

  getSessionStatus(): string {
    return this.sessionService.isSessionValid() ? 'Active' : 'Expired';
  }
} 