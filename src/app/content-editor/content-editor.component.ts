import { Component, OnInit, NgZone, Renderer2, OnDestroy } from '@angular/core';
import * as _ from 'lodash-es';
import * as iziModal from 'izimodal/js/iziModal';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { mergeMap, tap, delay, first } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import * as jQuery from 'jquery';

// Declare jQuery as any
declare var jQuery: any;
jQuery.fn.iziModal = iziModal;

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})

export class ContentEditorComponent implements OnInit, OnDestroy {

  private buildNumber: string;
  public logo: string;
  public showLoader = true;
  public contentDetails: any;
  public ownershipType: Array<string>;
  public queryParams: any;
  public videoMaxSize: any;
  contentEditorURL = 'content-editor/index.html';

  /**
   * Default method of class InteractiveEditorComponent
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private renderer: Renderer2,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.buildNumber = '4.9.0.c10c531';
    this.videoMaxSize = '150';
  }

  ngOnInit() {
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.getContentDetails().pipe(
      first(),
      tap((data: any) => {
        this.logo = 'https://dev.sunbirded.org/assets/images/sunbird_logo.png'; // added
        this.ownershipType = data.ownershipType;
        this.initEditor();
        this.setWindowContext();
        this.setWindowConfig();
      }),
      delay(10) // wait for iziModal to load
    ).subscribe((data) => {
      jQuery(".iziModal-iframe").css("width", "100%");
      jQuery('#contentEditor').iziModal('open');
      this.setRenderer();
      this.showLoader = false;
    }, (error) => {
      this.closeModal();
    });
  }

  editorURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.contentEditorURL + '?' + this.buildNumber);
  }

  private getContentDetails() {
    // Simulate an asynchronous call with a delay of 500ms
    return of({}).pipe(delay(500));
  }


  private setRenderer() {
    this.renderer.listen('window', 'editor:metadata:edit', () => {
      alert()
      this.closeModal();
    });
    this.renderer.listen('window', 'editor:window:close', () => {
      alert()
      this.closeModal();
    });
    this.renderer.listen('window', 'editor:content:review', () => {
      alert()
      this.closeModal();
    });
  }

  private initEditor() {
    let iframeURL = this.contentEditorURL + '?' + this.buildNumber;
    if (this.queryParams.developerMode && this.queryParams.developerMode === 1) {
      iframeURL = iframeURL + '&developerMode=1';
    }

    jQuery('#contentEditor').iziModal({
      title: '',
      iframe: true,
      iframeURL,
      navigateArrows: false,
      fullscreen: true,
      openFullscreen: true,
      closeOnEscape: false,
      overlayClose: false,
      overlay: false,
      overlayColor: '',
      history: false,
      onClosing: () => {
        this.zone.run(() => {
          this.closeModal();
        });
      }
    });
  }

  private setWindowContext() {
    window.context = _.cloneDeep({
      "user": {
        "id": "5a587cc1-e018-4859-a0a8-e842650b9d64",
        "name": "Gourav"
      },
      "did": "5d498109ff49c0d81a66921555309496",
      "sid": "WgmuuWmXDsk6ZaMj27t_9t8HtjNwykH0",
      "contentId": "do_113536016074268672144",
      "pdata": {
        "id": "dev.sunbird.portal",
        "ver": "4.9.0",
        "pid": "sunbird-portal.contenteditor"
      },
      "contextRollUp": {
        "l1": "01309282781705830427",
        "l2": "01274256635219968039517"
      },
      "tags": [
        "01309282781705830427",
        "01274256635219968039517",
        "01309282781705830427"
      ],
      "channel": "01309282781705830427",
      "framework": "knowlg_k-12",
      "ownershipType": ["createdBy", "createdFor"],
      "timeDiff": -280.363,
      "uid": "5a587cc1-e018-4859-a0a8-e842650b9d64",
      "etags": {
        "app": [],
        "partner": [],
        "dims": []
      }
    });
    if (this.queryParams.identifier) {
      window.context.contentId = this.queryParams.identifier;
    }
  }

  private setWindowConfig() {
    window.config = _.cloneDeep({
      baseURL: '',
      apislug: '/api',
      build_number: 'BUILDNUMBER',
      pluginRepo: '/plugins',
      aws_s3_urls: ['https://s3.ap-south-1.amazonaws.com/ekstep-public-dev/', 'https://ekstep-public-dev.s3-ap-south-1.amazonaws.com/'],
      plugins: [
        { 'id': 'org.ekstep.ceheader', 'ver': '1.0', 'type': 'plugin' },
         { 'id': 'org.ekstep.editcontentmeta', 'ver': '1.2', 'type': 'plugin' },
        { 'id': 'org.ekstep.video', 'ver': '1.0', 'type': 'plugin' },
        { 'id': 'org.ekstep.assessmentbrowser', 'ver': '1.1', 'type': 'plugin' },
      { 'id': 'org.ekstep.colorpicker', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.stage', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.text', 'ver': '1.2', 'type': 'plugin' },
      { 'id': 'org.ekstep.shape', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.video', 'ver': '1.5', 'type': 'plugin' },
      { 'id': 'org.ekstep.image', 'ver': '1.1', 'type': 'plugin' },
      { 'id': 'org.ekstep.audio', 'ver': '1.1', 'type': 'plugin' },
      { 'id': 'org.ekstep.hotspot', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.scribblepad', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.stageconfig', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.config', 'ver': '1.0', 'type': 'plugin' },
    //   { 'id': 'org.ekstep.telemetry', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.preview', 'ver': '1.2', 'type': 'plugin' },
      { 'id': 'org.ekstep.activitybrowser', 'ver': '1.3', 'type': 'plugin' },
      { 'id': 'org.ekstep.download', 'ver': '1.1', 'type': 'plugin' },
      { 'id': 'org.ekstep.unsupported', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.wordinfobrowser', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.viewecml', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.utils', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.help', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.editorstate', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.contenteditorfunctions', 'ver': '1.2', 'type': 'plugin' },
      { 'id': 'org.ekstep.keyboardshortcuts', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.richtext', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.iterator', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.navigation', 'ver': '1.0', 'type': 'plugin' },
      { 'id': 'org.ekstep.sunbirdmetadata', 'ver': '1.1', 'type': 'plugin' },
      { 'id': 'org.ekstep.questionset', 'ver': '1.0', 'type': 'plugin' }
      
      ],
      corePluginsPackaged: false,
      dispatcher: 'local',
      localDispatcherEndpoint: '/app/telemetry',
      previewURL: '/preview/preview.html',
      cloudStorage: {
            "presigned_headers": {
              'x-ms-blob-type': 'BlockBlob' // This header is specific to azure storage provider.
              /* TODO: if more configurations comes for cloud service provider
                 than we have do in more generic way like below:
                 For example:
                 cloudStorage: {
                    provider: 'azure' // azure, aws, etc..
                    azure: {
                      url: 'https://www.azureblogstorage.com'
                      presigned_headers: {
                        x-ms-blob-type: 'BlockBlob'
                      }
                    }
                 }
              */
            }
        }
    }
    );
    window.config.build_number = this.buildNumber;
    window.config.headerLogo = this.logo;
    window.config.aws_s3_urls = ['https://s3.ap-south-1.amazonaws.com/ekstep-public-qa/', 'https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/', 'https://sunbirddev.blob.core.windows.net/sunbird-content-dev/'];
    window.config.enableTelemetryValidation = false;
    window.config.lock = _.pick(this.queryParams, 'lockKey', 'expiresAt', 'expiresIn');
    window.config.videoMaxSize = this.videoMaxSize;
    window.config.cloudStorage = {
      presigned_headers: {
        'x-ms-blob-type': 'BlockBlob'
      }
    };
  }

  private validateRequest() {
    // Implement validation logic if needed
    // Example: Checking user permissions, content status, etc.
    // Return true if the request is valid, otherwise return false.
    return false;
  }

  private closeModal() {
    this.showLoader = false;
    if (document.getElementById('contentEditor')) {
      document.getElementById('contentEditor').remove();
    }
    this.router.navigate(['editors/content-list']); // Redirect to home page or content list page
  }

  ngOnDestroy() {
    if (document.getElementById('contentEditor')) {
      document.getElementById('contentEditor').remove();
    }
    const removeIzi = document.querySelector('.iziModal-isAttached');
    if (removeIzi) {
      removeIzi.classList.remove('iziModal-isAttached');
    }
  }
}
