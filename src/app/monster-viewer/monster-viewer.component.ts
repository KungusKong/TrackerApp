
import { Component, OnInit } from '@angular/core';
import { MonsterFetcherService } from './monster-fetcher.service';
import { Monster_Short } from './monster_short';
import { MatIcon } from '@angular/material/icon';
import { JsonpClientBackend } from '@angular/common/http';
import { MonsterFilterPipe } from '../monster-filter.pipe';

@Component({
  selector: 'app-monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.scss']
})
export class MonsterViewerComponent implements OnInit {

  constructor(private mService: MonsterFetcherService) {  }
  items: any[] = [];
  ms : any[] = [];
  monster: any;
  search: string = "";
  monsters: Monster_Short[] = [];

  ngOnInit(): void {
    this.getMonsters();
  }


  async selectMonster(url: string){
    this.monster = await this.mService.getMonsterByURL(url);

  }

  


  async getMonsters() {
    //this.monsters = this.mService.getMonstersShort(); 
    //this.mService.getMonstersShort().subscribe(monsters => this.monsters = monsters);
    this.items= await this.mService.getMonstersShort();
    
    
    //this.ms = this.items[1];
  }
  resolveAfter2Seconds(x:any) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  


  

}
