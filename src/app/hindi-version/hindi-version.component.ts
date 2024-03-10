import { Component, OnInit } from '@angular/core';
import $ from 'jquery'

@Component({
  selector: 'app-hindi-version',
  templateUrl: './hindi-version.component.html',
  // styleUrls: ['./hindi-version.component.css']
  styleUrls: ['../app.component.css']
})
export class HindiVersionComponent implements OnInit {

  constructor() { }

  title = 'speak-with-me';
  exploreandlearn = true;
  learnandplay = false;
  playgame = false;
  videohelp = false;

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
  }

  showLearnandplay() {
    this.exploreandlearn = false;
    this.learnandplay = true;
    this.playgame = false;
    this.videohelp = false;
  }

  showPlaygame() {
    this.exploreandlearn = false;
    this.learnandplay = false;
    this.playgame = true;
    this.videohelp = false;
  }

  showVideoHelp() {
    this.exploreandlearn = false;
    this.learnandplay = false;
    this.playgame = false;
    this.videohelp = true;
  }

}
