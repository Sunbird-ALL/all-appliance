import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-tamil-version',
  templateUrl: './tamil-version.component.html',
  // styleUrls: ['./tamil-version.component.css']
  styleUrls: ['../app.component.css']
})
export class TamilVersionComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  title = 'speak-with-me';
  exploreandlearn = false;
  learnandplay = false;
  playgame = false;
  videohelp = false;
  myLearningJourney = true;

  ngOnInit() {
    // $(document).ready(function() {
    //   $('.btnNext').click(function(){
    //     $('.active').next('.nav-link').trigger('click');
    //     });
    // });
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

  logout(){
    localStorage.removeItem("profileName");
    localStorage.removeItem("virtualId");
    localStorage.removeItem("sessionId");
    this.router.navigate(['/login']);
  }
}
