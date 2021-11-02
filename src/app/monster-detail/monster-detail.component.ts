import { Component, OnInit, Input, OnChanges, Output, EventEmitter, Renderer2, ViewChild, ElementRef, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MonsterFetcherService } from '../monster-viewer/monster-fetcher.service';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.scss']
})
export class MonsterDetailComponent implements OnInit {

  monster?: any;
  @Input() monsterURL!: any;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.close();
  }

  constructor(private mservice: MonsterFetcherService, private renderer: Renderer2, public dialogRef: MatDialogRef<MonsterDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(JSON.stringify(this.data.item));
    this.monsterURL = this.data.item.url;
   }

   ngOnInit(): void {
    this.selectMonster(this.data.item.url);
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(JSON.stringify(this.data.item));
    this.selectMonster(this.data.item.url);
    
  }
  clicked(str: string){
   
  }

  close(){
    
    this.monsterURL = null;
    this.mservice.selectedMonster = null;
    this.dialogRef.close();
  }

  async selectMonster(url: string){
    this.monster = await this.mservice.getMonsterByURL(url);
   
    //console.log("special_abilities	: "+ JSON.stringify(this.monster.legendary_actions	));

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
  getModifierString(stat: number): string{
    let symb = "+";
    if(stat<10){
      let symb = "";
    }
    let value = symb+ this.getModifier(stat);
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
