import { Component, OnInit, Input, OnChanges, Output, EventEmitter, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';

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
  @ViewChild('overlay') monsterContent!: ElementRef;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.close();
  }

  constructor(private mservice: MonsterFetcherService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
    if(this.monster){
     if(e.target == this.monsterContent.nativeElement){
        
         this.close();
     }
    }
  });
   }

   ngOnInit(): void {
    this.selectMonster(this.monsterURL);
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.selectMonster(this.monsterURL);
    
  }
  clicked(str: string){
   
  }

  close(){
    
    this.monsterURL = null;
    this.mservice.selectedMonster = null;
    this.onClose.emit();
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
