import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery';
import { SessionService } from '../services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tamil-version',
  templateUrl: './tamil-version.component.html',
  // styleUrls: ['./tamil-version.component.css']
  styleUrls: ['../app.component.css']
})
export class TamilVersionComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
    this.timerSubscription = this.sessionService.getSessionTimer().subscribe(
      time => this.remainingTime = time
    );
    this.warningSubscription = this.sessionService.getShowWarning().subscribe(
      show => this.showWarning = show
    );
  }

  title = 'speak-with-me';
  exploreandlearn = false;
  learnandplay = false;
  playgame = false;
  videohelp = false;
  myLearningJourney = true;
  iframeHeight: any = "100%";
  remainingTime: number = 0;
  showWarning: boolean = false;
  private timerSubscription: Subscription;
  private warningSubscription: Subscription;

  /**
   * dispatch telemetry window unload event before browser closes
   * @param  event
   */
  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {}

  ngOnInit() {
    // $(document).ready(function() {
    //   $('.btnNext').click(function(){
    //     $('.active').next('.nav-link').trigger('click');
    //     });
    // });

    window.addEventListener('message', this.handleMessageEvent.bind(this));
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

  showExploreandLearn() {
    this.exploreandlearn = true;
    this.learnandplay = false;
    this.playgame = false;
    this.videohelp = false;
    this.myLearningJourney = false;
  }

  showLearnandplay() {
    this.exploreandlearn = false;
    this.learnandplay = true;
    this.playgame = false;
    this.videohelp = false;
    this.myLearningJourney = false;
  }

  showPlaygame() {
    this.exploreandlearn = false;
    this.learnandplay = false;
    this.playgame = true;
    this.videohelp = false;
    this.myLearningJourney = false;
  }

  showVideoHelp() {
    this.exploreandlearn = false;
    this.learnandplay = false;
    this.playgame = false;
    this.videohelp = true;
    this.myLearningJourney = false;
  }

  showMyLearningJourney() {
    this.exploreandlearn = false;
    this.learnandplay = false;
    this.playgame = false;
    this.videohelp = false;
    this.myLearningJourney = true;
  }

  logout() {
    this.sessionService.endSession();
  }

  private handleMessageEvent(event: MessageEvent): void {
    console.log(event.data);
    if (event.data.type === 'stringLengths' && event.data.length) {
      const charLength = event.data.length;
      let paddingTop = 100;
      if (charLength >= 0 && charLength <= 100) {
        paddingTop = 120;
      } else if (charLength > 100 && charLength <= 200) {
        paddingTop = 150;
      } else if (charLength > 200) {
        paddingTop = 180;
      }
      this.iframeHeight = `${paddingTop}%`;
    } else if (event.data.type === 'restore-iframe-content') {
      this.iframeHeight = "100%";
    }
  }
}
