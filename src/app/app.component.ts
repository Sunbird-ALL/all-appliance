import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from './services/session.service';
import $ from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'speak-with-me';
  remainingTime: number = 0;
  showWarning: boolean = false;
  private timerSubscription: Subscription;
  private warningSubscription: Subscription;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.timerSubscription = this.sessionService.getSessionTimer().subscribe(
      time => this.remainingTime = time
    );

    this.warningSubscription = this.sessionService.getShowWarning().subscribe(
      show => this.showWarning = show
    );

    // $(document).ready(function() {
    //   $('.btnNext').click(function(){
    //     $('.active').next('.nav-link').trigger('click');
    //     });
    // });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.warningSubscription) {
      this.warningSubscription.unsubscribe();
    }
  }

  public getFingerPrintJsId = () => {
    const fpDetails_v2 = localStorage.getItem("did");
    return fpDetails_v2;
  }
}
