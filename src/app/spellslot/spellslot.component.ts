import { Component, OnInit, Input } from '@angular/core';
import { SpellSlot } from '../spellslot';

@Component({
  selector: 'app-spellslot',
  templateUrl: './spellslot.component.html',
  styleUrls: ['./spellslot.component.css']
})
export class SpellslotComponent implements OnInit {

@Input() spellSlot: SpellSlot = {
  level: 1,
  currentAmount: 1,
  maxAmount: 1
};

use(){
  this.spellSlot.currentAmount--;
  if(this.spellSlot.currentAmount<0){
    this.spellSlot.currentAmount= 0;
    alert("Out of level "+this.spellSlot.level+" slots!");
  }
}

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
