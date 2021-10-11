import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterViewerService } from './services/monster-viewer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Initiative Tracker';
  
  viewerOpen = false;

  constructor(public viewerService: MonsterViewerService) {
   
  }
  ngOnInit(): void {
    this.viewerOpen = this.viewerService.searchOpen;
  }
  ngOnDestroy(): void {

  }
}
