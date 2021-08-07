import { Component, OnInit } from '@angular/core';
import { SpellSlot } from '../spellslot';

declare var $: any;
@Component({
  selector: 'app-spell-slot-tracker',
  templateUrl: './spell-slot-tracker.component.html',
  styleUrls: ['./spell-slot-tracker.component.css']
})
export class SpellSlotTrackerComponent implements OnInit {

  constructor() { }

  
  slotsArray : SpellSlot[] = [
    {
      level: 1,
      currentAmount: 4,
      maxAmount: 4
    },
    {
      level: 2,
      currentAmount: 4,
      maxAmount: 4
    },
    {
      level: 3,
      currentAmount: 3,
      maxAmount: 3
    },
    {
      level: 4,
      currentAmount: 3,
      maxAmount: 3
    },
    {
      level: 5,
      currentAmount: 2,
      maxAmount: 2
    },
    {
      level: 6,
      currentAmount: 2,
      maxAmount: 2
    },
    {
      level: 7,
      currentAmount: 1,
      maxAmount: 1
    },
    {
      level: 8,
      currentAmount: 1,
      maxAmount: 1
    },
    {
      level: 9,
      currentAmount: 1,
      maxAmount: 1
    }

  ];
   
  increaseMax(){
    
    let temp: SpellSlot = {
      level: this.slotsArray.length+1,
      currentAmount: 1,
      maxAmount: 1
    }
    this.slotsArray.push(temp);
  }
  decreaseMax(){
    this.slotsArray.pop();
  }

  ngOnInit(): void {
    
  }

}
