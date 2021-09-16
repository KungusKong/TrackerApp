
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
  items: any = [];
  ms : any[] = [];
 
  monsters: Monster_Short[] = [];

  ngOnInit(): void {
    this.getMonsters();
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
