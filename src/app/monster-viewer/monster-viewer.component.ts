
import { Component, OnInit } from '@angular/core';
import { MonsterFetcherService } from './monster-fetcher.service';
import { Monster_Short } from './monster_short';

@Component({
  selector: 'app-monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.css']
})
export class MonsterViewerComponent implements OnInit {

  constructor(private mService: MonsterFetcherService) {  }
  items = [];
 
  monsters: Monster_Short[] = [];

  ngOnInit(): void {
    this.getMonsters();
  }

  getMonsters(): void {
    //this.monsters = this.mService.getMonstersShort(); 
    //this.mService.getMonstersShort().subscribe(monsters => this.monsters = monsters);
    this.items= this.mService.getMonstersShort() as never ;
  }

  

}
