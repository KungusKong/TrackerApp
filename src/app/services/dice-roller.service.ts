import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {

  constructor() { }



  rollHealth(monster: any){
    if(monster != undefined){
       let numDice: number = monster.hit_dice.split('d')[0];
       let sizDice: number = monster.hit_dice.split('d')[1];
       let value = 0;
       for( let x=0; x<numDice; x++){
         value += this.diceRoll(sizDice);
       }
       value += (this.getModifier(monster.constitution) * numDice);
       return value;
    }
    return 0;
  }

  rollInitiative(monster: any){
    if(monster != undefined){
      let value = this.diceRoll(20) + this.getModifier(monster.dexterity);
      return value;
    }
    else{
      return this.diceRoll(20);
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
