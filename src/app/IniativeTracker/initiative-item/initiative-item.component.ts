import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InitiativeItem} from '../InitiativeItem';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MonsterDetailComponent } from 'src/app/monster-detail/monster-detail.component';
import { MonsterFetcherService } from 'src/app/monster-viewer/monster-fetcher.service';
import { MonsterLookupComponent } from 'src/app/monster-lookup/monster-lookup/monster-lookup.component';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-initiative-item',
  templateUrl: './initiative-item.component.html',
  styleUrls: ['./initiative-item.component.scss']
})
export class InitiativeItemComponent implements OnInit {


 @Input() item: InitiativeItem={
  roll: 1,
  url: "none",
  name: "Name",
  hp: 20,
  order: 1,
  showMove: false,
  notes: ""
  };

  monsterName = "none";

  monster: any = undefined;

 @Input() selected = 1;

 @Output("sortItems") sortItems: EventEmitter<any> = new EventEmitter();
 @Output("removeItems") removeItems: EventEmitter<any> = new EventEmitter();
 @Output("moveUp") moveUp: EventEmitter<any> = new EventEmitter();
 @Output("duplicate") duplicate: EventEmitter<any> = new EventEmitter();
 @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
 
 
   sort(): void{
    this.sortItems.emit();
    this.refresh.emit();
  }
  
  remove(): void{
    if(this.item){

      this.removeItems.emit(this.item.order);
    }
    this.refresh.emit();
  }
  moveUpwards(): void{
    if(this.item){

      this.moveUp.emit(this.item.order);
    }
    this.refresh.emit();
  }

  dup(): void{
    if(this.item){
      this.duplicate.emit(this.item.order);
    }
    this.refresh.emit();
  }

  edit(){
    this.refresh.emit();
  }

  constructor(private mService: MonsterFetcherService, private sService: SettingsService, public dialog: MatDialog) { }

  async ngOnInit() {
    if(this.item.url != 'none'){
      let m= await this.mService.getMonsterByURL(this.item.url);
      this.monsterName = m.name;
      this.monster = m;
    }
  }

  async linkClicked(){
    let monster;
    if(this.item.url == "none"){
      this.openLookup();
      
    }
    else{
      const dialogRef = this.dialog.open(MonsterDetailComponent, {
        width: '1px',
        height: '1px',
        data: {item: this.item},
        panelClass: 'modal-content'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
      
    }
  }
  openLookup() {
    const dialogRef = this.dialog.open(MonsterLookupComponent, {
      panelClass:  "monsterLookup"
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result =>{
      //console.log("Result: "+JSON.stringify(result));
      if(result.hasData){
        this.monsterName = result.name;
        this.item.url = result.url;
        this.monster = result.monster;
        if(this.sService.autoNaming){
          this.setName();
        }
        if(this.sService.autoRollInit){
          this.rollInitiative();
        }
        if(this.sService.acNote){
          this.addACNote();
        }
        if(this.sService.autoAvgHealth){
          this.setHealth();
        }
        if(this.sService.autoRollHealth){
          this.rollHealth();
        }
        //console.log("THE MONSTER IS: "+JSON.stringify(result.monster));
      }
     //return result;
    });
  }

  unlink(){
    this.monsterName = "none";
    this.item.url = "none";
    this.monster = undefined;
  }
  setName(){
    if(this.monster != undefined){
      this.item.name = this.monsterName;
      this.edit();
    }
  }
  addACNote(){
    if(this.monster != undefined){
      if(this.item.notes == ""){
        this.item.notes = "AC: "+this.monster.armor_class;
      }
      else{
      this.item.notes = this.item.notes + "\n AC: "+this.monster.armor_class;
      }
      this.edit();
    }
  }

  setHealth(){
    if(this.monster != undefined){
      this.item.hp = this.monster.hit_points;
      this.edit();
    }
  }
  rollHealth(){
    if(this.monster != undefined){
       let numDice: number = this.monster.hit_dice.split('d')[0];
       let sizDice: number = this.monster.hit_dice.split('d')[1];
       let value = 0;
       for( let x=0; x<numDice; x++){
         value += this.diceRoll(sizDice);
       }
       value += (this.getModifier(this.monster.constitution) * numDice);
       this.item.hp = value;
       this.edit();
    }
  }

  rollInitiative(){
    if(this.monster != undefined){
      let value = this.diceRoll(20) + this.getModifier(this.monster.dexterity);
      this.item.roll = value;
      this.sort();
    }
    else{
      this.item.roll = this.diceRoll(20);
      this.sort();
    }

  }

  diceRoll(max: number){
    return Math.floor(Math.random()*max)+1;
  }

  getModifier(stat: number): number{
    let value = Math.floor((stat - 10)/2);
    return value;
  }

}
