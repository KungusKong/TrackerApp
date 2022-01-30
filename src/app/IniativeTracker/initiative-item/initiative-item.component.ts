import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InitiativeItem} from '../InitiativeItem';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MonsterDetailComponent } from 'src/app/monster-detail/monster-detail.component';
import { MonsterFetcherService } from 'src/app/monster-viewer/monster-fetcher.service';
import { MonsterLookupComponent } from 'src/app/monster-lookup/monster-lookup/monster-lookup.component';
import { SettingsService } from 'src/app/services/settings.service';
import { DiceRollerService } from 'src/app/services/dice-roller.service';
import { DamageDialogComponent } from '../damage-dialog/damage-dialog.component';


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
  maxHp: 20,
  order: 1,
  showMove: false,
  notes: ""
  };

  monsterName = "none";
  ac = "AC:10";

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

  constructor(private mService: MonsterFetcherService, private sService: SettingsService, public dialog: MatDialog, private dR: DiceRollerService) { }

  async ngOnInit() {
    if(this.item.url != 'none'){
      let m= await this.mService.getMonsterByURL(this.item.url);
      this.monsterName = m.name;
      this.monster = m;
      this.setAC();
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
        this.setAC();
        if(this.sService.autoNaming){
          this.setName();
        }
        if(this.sService.autoRollInit){
          this.rollInitiative();
        }
        if(this.sService.acNote){
          //this.addACNote();
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
  openDamageMenu(){
    const dialogRef = this.dialog.open(DamageDialogComponent, {
      panelClass: "settingsDialog"
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.item.hp -= result;
      this.edit();
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
  setAC(){
    if(this.monster != undefined){
      this.ac = "AC:"+this.monster.armor_class;
    }
  }

  setHealth(){
    if(this.monster != undefined){
      this.item.hp = this.monster.hit_points;
      this.item.maxHp = this.monster.hit_points;
      this.edit();
    }
  }
  rollHealth(){
    if(this.monster != undefined){
       this.item.hp = this.dR.rollHealth(this.monster);
       this.item.maxHp = this.item.hp;
       this.edit();
    }
  }

  rollInitiative(){
    this.item.roll = this.dR.rollInitiative(this.monster);
    this.sort()

  }

  diceRoll(max: number){
    return Math.floor(Math.random()*max)+1;
  }

  getModifier(stat: number): number{
    let value = Math.floor((stat - 10)/2);
    return value;
  }

}
