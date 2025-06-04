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
  iframeHeight: any = "600px";
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

  adjustIframeHeight(charLength: number) {
    if (charLength >= 0 && charLength <= 100) {
      this.iframeHeight = "700px";
    } else if (charLength >= 100 && charLength <= 150) {
      this.iframeHeight = "800px";
    } else if (charLength >= 150 && charLength <= 200) {
      this.iframeHeight = "850px";
    } else if (charLength >= 200 && charLength <= 300) {
      this.iframeHeight = "900px";
    } else if (charLength >= 300 && charLength <= 400) {
      this.iframeHeight = "980px";
    } else if (charLength >= 400 && charLength <= 500) {
      this.iframeHeight = "1000px";
    } else if (charLength >= 500 && charLength <= 715) {
      this.iframeHeight = '1250px';
    } else {
      this.iframeHeight = '1300px';
    }
  }

  private handleMessageEvent(event: MessageEvent): void {
    console.log(event.data);
    if (event.data.type === 'stringLengths' && event.data.length) {
      this.adjustIframeHeight(event.data.length);
    } else if (event.data.type === 'restore-iframe-content') {
      this.iframeHeight = "600px";
    }
    // if (event.data.type === 'stringLengths' && event.data.length) {
    //   this.levelService.sendevent.data({
    //     type: 'stringLengths',
    //     length: event.data.length,
    //   });
    // } else if (event.data.type === 'restore-iframe-content') {
    //   this.levelService.sendMessage({ type: 'restore-iframe-content' });
    // }
  }
}
