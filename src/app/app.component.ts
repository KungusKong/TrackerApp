import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterViewerService } from './services/monster-viewer.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Initiative Tracker';
  
  viewerOpen = false;

  constructor(public viewerService: MonsterViewerService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer ) {
    this.matIconRegistry.addSvgIcon(
      "dice",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/DiceIcon.svg")
    );
   
  }
  ngOnInit(): void {
    this.refreshViewer();
  }
  ngOnDestroy(): void {

  }

  refreshViewer(){
    
    this.viewerOpen = this.viewerService.searchOpen;
    console.log("Viewer: " +this.viewerOpen);
  }
}
