import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-session-warning-popup',
  template: `
    <div class="popup-overlay" *ngIf="show">
      <div class="popup-content">
        <div class="warning-text">Your session will expire in</div>
        <div class="timer-text">{{ remainingTime }} seconds</div>
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
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      backdrop-filter: blur(5px);
    }
    .popup-content {
      background-color: white;
      padding: 30px 40px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      animation: fadeIn 0.3s ease-out;
    }
    .warning-text {
      color: #555;
      font-size: 1rem;
      margin-bottom: 10px;
    }
    .timer-text {
      font-size: 1.8rem;
      font-weight: 700;
      color: #d9534f;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    @media (max-width: 480px) {
      .popup-content {
        padding: 20px 25px;
      }
      .warning-text {
        font-size: 0.9rem;
      }
      .timer-text {
        font-size: 1.5rem;
      }
    }
  `]
})
export class SessionWarningPopupComponent implements OnChanges {
  @Input() show: boolean = false;
  @Input() remainingTime: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && changes['show'].currentValue) {
      // Future logic for sound or other effects can be added here
    }
  }
} 