import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-session-warning-popup',
  template: `
    <div class="popup-overlay" *ngIf="show">
      <div class="popup-content">
        <div class="warning">Your session will expire in</div>
        <div class="timer">{{remainingTime}} seconds</div>
      </div>
    </div>
  `,
  styles: [`
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .popup-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .warning {
      color: #dc3545;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .timer {
      font-size: 24px;
      font-weight: bold;
      color: #dc3545;
    }
  `]
})
export class SessionWarningPopupComponent implements OnChanges {
  @Input() show: boolean = false;
  @Input() remainingTime: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && changes['show'].currentValue) {
      // Play a sound or add any additional effects when popup shows
    }
  }
} 