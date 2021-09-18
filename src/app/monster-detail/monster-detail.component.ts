import { Component, OnInit, Input } from '@angular/core';
import { MonsterFetcherService } from '../monster-viewer/monster-fetcher.service';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.scss']
})
export class MonsterDetailComponent implements OnInit {

  monster?: any;
  @Input() monsterURL!: string;

  constructor(private mservice: MonsterFetcherService) { }

   ngOnInit(): void {
    this.selectMonster(this.monsterURL);
  }

  close(){
    this.monster = null;
    this.mservice.selectedMonster = null;
  }

  async selectMonster(url: string){
    this.monster = await this.mservice.getMonsterByURL(url);

  }
}
