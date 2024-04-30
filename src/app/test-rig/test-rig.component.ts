import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-rig',
  templateUrl: './test-rig.component.html',
  styleUrls: ['./test-rig.component.css']
})
export class TestRigComponent implements OnInit {

  username: string;
  password:string

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, ) {}

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.username = params.username
      this.password = params.password
    });
  }


  getIframeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/sb-all/?username=${this.username}&password=${this.password}`)
  }
}
