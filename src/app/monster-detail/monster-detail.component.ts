import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MonsterFetcherService } from '../monster-viewer/monster-fetcher.service';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.scss']
})
export class MonsterDetailComponent implements OnInit {

  monster?: any;
  @Input() monsterURL!: any;

  constructor(private mservice: MonsterFetcherService) { }

   ngOnInit(): void {
    this.selectMonster(this.monsterURL);
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.selectMonster(this.monsterURL);
    
  }

  close(){
    this.monsterURL = null;
    this.mservice.selectedMonster = null;
  }

  async selectMonster(url: string){
    this.monster = await this.mservice.getMonsterByURL(url);

  }

  getAdditionalHP(): number{
    let value = 0;
    if(this.monster){
      let count: string = this.monster.hit_dice.substr(0, this.monster.hit_dice.indexOf('d'));
      value = parseInt(count)*this.getModifier(this.monster.constitution);
    }
    return value;
  }

  getModifier(stat: number): number{
    let value = Math.floor((stat - 10)/2);
    return value;
  }
}
