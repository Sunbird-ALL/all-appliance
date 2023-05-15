import { Component } from '@angular/core';
import $ from 'jquery'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

  
})

export class AppComponent {
  title = 'speak-with-me';

  ngOnInit() {
    $(document).ready(function() {
      $('.btnNext').click(function(){
        $('.active').next('.nav-link').trigger('click');
        });
    });
 }
 public getFingerPrintJsId = () => {
    const fpDetails_v2 = localStorage.getItem("did");
    return fpDetails_v2;
  }
}
