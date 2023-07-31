import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  value: any;
  public queryParams: any;
  public contentDetails: any;
  playerConfig = {};
  isLoading = true;
  config: any;
  sidemenuConfig: any;
  @Input() showPlayerOnly = false;
  selectedFile: File;
  jsonDataLoaded = false;

  @ViewChild('preview', { static: false }) previewElement: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('assets/data.json').subscribe(
        (data) => {
          // Handle the loaded JSON data here
          this.playerConfig = data;
          console.log(data);
        },
        (error) => {
          // Handle any error that occurs during the HTTP request
          console.error('Error loading JSON file:', error);
        }
      );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  
  loadJson(): void {
    this.jsonDataLoaded = true;
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const content = fileReader.result as string;
        try {
          this.playerConfig = JSON.parse(content);
          console.log('JSON data loaded:', this.playerConfig);
          const src = this.previewElement.nativeElement.src;
    this.previewElement.nativeElement.src = '';
    this.previewElement.nativeElement.src = src;
    this.previewElement.nativeElement.onload = () => {
    setTimeout(() => {
        this.initializePreview(this.previewElement.nativeElement.contentWindow, this.playerConfig);
        // ...existing code...
    }, 1000);
    };
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      fileReader.readAsText(this.selectedFile);
    } else {
      console.error('Please select a JSON file to load.');
    }
  }

  // ngAfterViewInit() {
  //   const src = this.previewElement.nativeElement.src;
  //   this.previewElement.nativeElement.src = '';
  //   this.previewElement.nativeElement.src = src;
  //   this.previewElement.nativeElement.onload = () => {
  //   setTimeout(() => {
  //       this.initializePreview(this.previewElement.nativeElement.contentWindow, this.playerConfig);
  //       // ...existing code...
  //   }, 1000);
  //   };
  // }
  
  initializePreview(contentWindow: Window, playerConfig: any): void {
    setTimeout(() => {
      console.log('Initializing preview...');
      console.log('Player Configuration:', playerConfig);
      //(contentWindow as any).cordova = true; //offline use case
  
      // Add your initialization logic here
      (this.playerConfig as any).metadata.mimeType = 'application/vnd.ekstep.ecml-archive';
      // Call the initializePreview function on the contentWindow
      (contentWindow as any).initializePreview(playerConfig);
  
      // ...perform any other necessary actions...
  
    }, 100);
  }

}
