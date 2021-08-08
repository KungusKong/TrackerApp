import { Component, OnInit } from '@angular/core';
import { MonsterFetcherService } from './monster-fetcher.service';

@Component({
  selector: 'app-monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.css']
})
export class MonsterViewerComponent implements OnInit {

  constructor() { }
 

  ngOnInit(): void {
  }

}
