import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { MonsterFetcherService } from '../monster-viewer/monster-fetcher.service';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.scss']
})
export class MonsterDetailComponent implements OnInit {

  monster?: any;
  @Input() monsterURL!: any;
  @Output() onClose = new EventEmitter();

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
    this.onClose.emit();
  }

  async selectMonster(url: string){
    this.monster = await this.mservice.getMonsterByURL(url);
   
    console.log("special_abilities	: "+ JSON.stringify(this.monster.legendary_actions	));

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

  isSavingThrow(prof: any): boolean{
    if(prof.proficiency.name.includes("Saving Throw")){
      return true;
    }
    return false;

  }
  isSkill(prof: any): boolean{
    if(prof.proficiency.name.includes("Skill")){
      return true;
    }
    return false;

  }
  removeProfType(prof: any): string{
    let value = prof.proficiency.name;
    if(this.isSavingThrow(prof)){
      value = value.slice(13);
    }
    if(this.isSkill(prof)){
      value = value.slice(6);
    }


    //console.log("Value: "+ value);
    return value;

  }

   toTitleCase(str: any) {
    return str.replace(/\w\S*/g, function(txt:any){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    
}

  getSenses(): string{
    let value = "";
    for(let key in this.monster.senses){
      value = value + this.formatKey(key) + " "+ this.monster.senses[key]+"  ";
    }
    return value;

  }
  formatKey(key: string): string{
    key = key.replace(/_/g, ' ');
    key = this.toTitleCase(key);
    return key;
  }

}
